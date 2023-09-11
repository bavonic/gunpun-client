import { CollectionSchema, MapSchema, Schema, type } from "@colyseus/schema";
import { Client, Delayed, Room } from "colyseus";
import { getEnv } from "../../AppConfigs";
import { MatchResult, WindDirection } from "../../GameTypes";
import { Emitter, EmitterItem } from "../../modules/emitter";
import { wait } from "../../shared/blockchain";
import { DateTimeUtils } from "../../utils";
import { MatchHistoriesModule } from "../match-histories/module";
import { UserModule } from "../users/module";
import { GameEvent, MapConfig } from './matchs.types';
import { PlatformSchema } from "./schemas/platform.schema";
import { PlayerSchema } from "./schemas/player.schema";
import { UserSchema } from "./schemas/user.schema";
import { NpcSkillId, PerformNpcSkillParams, PlayerEffected, PlayerShotPayload } from "./skills/skills.types";

class State extends Schema {
  @type('string')
  name = '';

  @type({ map: UserSchema })
  users = new MapSchema<UserSchema>();

  @type({ map: PlayerSchema })
  players = new MapSchema<PlayerSchema>();

  @type({ collection: PlatformSchema })
  platforms = new CollectionSchema<PlatformSchema>();

  @type('number')
  preparingTime = ['develop', 'staging'].includes(getEnv('ENV')) ? 5 : 15;

  @type('number')
  timeRemain = 0;

  @type('number')
  turnTimeRemain = 0;

  @type('number')
  turnTime = 0;

  @type('number')
  windLevel = 0;

  @type('string')
  winDirection: WindDirection = 'RIGHT';
}

export class MatchRoom extends Room<State> {
  emitter: Emitter<{ client: Client, payload?: any }>;
  totalTimer: Delayed;
  turnTimer: Delayed;
  onTurnFinished?: () => any;
  hostId: string;
  mapConfig: MapConfig;
  ignoreAuth = false;

  async onCreate(payload?: any) {
    this.emitter = new Emitter();
    this.setState(new State());
    this.listenEventFromUsers();
    this.handler();
    this.setMetadata({ ...this.metadata, mapConfig: this.mapConfig });
  }

  async onAuth(client: Client, params?: any) {
    if (!params || !params.auth) throw Error("UNAUTHORIZED");
    if (this.state.users.size >= this.mapConfig.numberOfPlayers) throw Error("ENOUGH_USERS");

    let teamASize = 0;
    let teamBSize = 0;

    this.state.users.forEach((u) => {
      if (u.teamId === 'A') teamASize += 1;
      if (u.teamId === 'B') teamBSize += 1;
    })

    const userData = await UserModule.auth(params.auth);

    const user = new UserSchema({
      id: client.sessionId,
      userId: userData._id,
      isHost: this.state.users.size === 0,
      teamId: teamASize <= teamBSize ? 'A' : 'B',
      name: userData.nickname || userData.name,
      avatar: userData.avatar,
    });

    this.state.users.set(user.id, user);

    if (user.isHost) {
      this.setMetadata({
        ...this.metadata,
        hostAvatar: userData.avatar,
        hostName: userData.nickname,
        createdAt: DateTimeUtils.timeToSeconds()
      })
    }

    return user;
  }

  async onJoin(client: Client) {
    console.log(`Client ${client.id} joined ${this.roomId}`);
    this.onMessage(GameEvent.JOIN_WAITING_ROOM, () => {
      this.broadcast(GameEvent.JOIN_WAITING_ROOM)
    })
  }

  async onLeave(client: Client) {
    const user = this.getUser(client);
    if (!user) return;
    if (user.isHost) {
      this.broadcast(GameEvent.HOST_WAITING_ROOM);
      this.disconnect();
      return
    }
    await this.deleteUser(client);
    console.log(`Client ${client.id} leaved`);
    this.broadcast(GameEvent.OUT_WAITING_ROOM);
  }

  async onDispose() {
    this.emitter.removeAllListeners();
    console.log(`Room ${this.roomId} dispose`);
  }

  registerEvent(event: string) {
    this.onMessage(event, (client, payload) => {
      this.emitter.emit(event, { client, payload });
    })
  }

  listenEventFromUsers() {
    Object.values(GameEvent).map((event) => {
      const isUser = event.indexOf('USER_') === 0;
      if (isUser) this.registerEvent(event);
    })
  }

  private async handler() {
    // ======================= Stage: Setup =======================
    // User change team
    this.emitter.on(GameEvent.USER_CHANGE_TEAM, ({ client, payload: teamId }) => {
      const user = this.getUser(client);
      if (!user || !['A', 'B'].includes(teamId)) return;

      let teamSize = 0;
      this.state.users.forEach((u) => {
        if (u.teamId === teamId) teamSize += 1;
      })

      if (teamSize >= this.mapConfig.numberOfPlayers / 2) return;
      user.teamId = teamId;

      let users: any[] = [];
      this.state.users.forEach(u => users.push(u.toJSON()));
      this.broadcast(GameEvent.SERVER_UPDATE_USERS, users);
    })

    // User ready
    const listenerUserReady = this.emitter.on(GameEvent.USER_READY, ({ client, payload }) => {
      const user = this.getUser(client);
      if (user) user.isReady = !!payload;
    });

    // Host start
    await new Promise((resolve) => {
      const listener = this.emitter.on(GameEvent.USER_START, ({ client }) => {
        // Make sure user is HOST
        const user = this.getUser(client);
        const isEnoughUsers = this.state.users.size >= this.mapConfig.numberOfPlayers;
        if (!user || !user.isHost || !isEnoughUsers) return;

        // Make sure all user is ready
        let isAllUserReady = true;
        this.state.users.forEach((user) => isAllUserReady = user.isReady);
        if (!isAllUserReady) return;
        listener.destroy();
        listenerUserReady.destroy();
        resolve(true);
      })
    })

    // ======================= Stage: User Preparing =======================
    await new Promise((resolve) => {
      if (this.ignoreAuth) return resolve(true);
      const listenerUserSelectSkills = this.emitter.on(GameEvent.USER_SELECT_SKILLS, ({ client, payload }) => {
        const user = this.getUser(client);
        if (user) user.setSkills(payload);
      });

      const interval = setInterval(() => {
        this.state.preparingTime -= 1;
        if (this.state.preparingTime === 0) {
          clearInterval(interval);
          listenerUserSelectSkills.destroy();
          resolve(true);
        }
      }, 1000)

      this.broadcast(GameEvent.SERVER_START_USERS_PREPARING);
    });

    // ======================= Stage: Initialize Map =======================
    this.broadcast(GameEvent.SERVER_INITIALIZE_MATCH);
    await this.initialize();

    // Preload assets
    await new Promise((resolve) => {
      const listener = this.emitter.on(GameEvent.USER_PRELOAD_ASSETS_COMPLETED, async ({ client, payload }) => {
        const user = this.getUser(client);
        if (user) user.isLoadedAssets = true;

        // Make sure all users loaded assets
        let isAllUserCompleted = true;
        this.state.users.forEach((user) => isAllUserCompleted = user.isLoadedAssets);
        if (!isAllUserCompleted) return;
        listener.destroy();
        const positions = payload?.positions as { id: string, x: number, y: number }[];

        this.state.players.forEach((player) => {
          const position = positions.find(v => v.id === player.id);
          if (position) {
            player.x = position.x;
            player.y = position.y;
          }
        })
        resolve(true);
      });

      this.broadcast(GameEvent.SERVER_PRELOAD_ASSETS, { mapConfig: this.mapConfig });
    })

    // Perform intro
    let userCompletedCount = 0;
    await new Promise((resolve) => {
      const listener = this.emitter.on(GameEvent.USER_PERFORM_INTRO_COMPLETED, ({ client }) => {
        const user = this.getUser(client);
        if (!user) return;

        // Make sure all users perform INTRO done
        userCompletedCount += 1;
        if (userCompletedCount !== this.state.users.size) return;
        listener.destroy();
        resolve(true);
      });

      this.broadcast(GameEvent.SERVER_PERFORM_INTRO);
    })

    // ======================= Stage: Process =======================
    // Start match time
    this.state.timeRemain = this.mapConfig.totalTime;
    this.totalTimer = this.clock.setInterval(() => {
      if (this.state.timeRemain === 0) {
        // End Time
        this.totalTimer.pause();
        this.turnTimer?.pause();
      } else {
        this.state.timeRemain -= 1;
      }
    }, 1000);
    this.clock.start();

    // Map Control
    await this.control();

    // ======================= Stage: Finish =======================
    if (this.totalTimer) this.totalTimer.clear();
    if (this.turnTimer) this.turnTimer?.clear();
  }

  async initialize() {
    if (!this.mapConfig) throw Error("MapConfig must be defined before.");
  }

  async control() {
    let turnIndex = -1;

    const action: () => any = async () => {

      const result = this.checkResult();
      if (result) {
        MatchHistoriesModule.capture({ roomId: this.roomId, map: this.mapConfig, result });
        return this.broadcast(GameEvent.SERVER_MATCH_FINISHED, result);
      }

      this.state.turnTime += 1;

      let players: PlayerSchema[] = [];

      this.state.players.forEach(p => {
        if (p.remainHp > 0) players.push(p);
      });

      players = players.sort((a, b) => b.speed - a.speed);

      turnIndex += 1;
      this.state.players.forEach(p => p.recoverSkills());

      let player = players[turnIndex];

      if (!player) {
        turnIndex = 0;
        player = players[turnIndex];
      }

      await this.startPlayerTurn(player);
      return action();
    };

    return action();
  }

  getUser(client: Client) {
    return this.state.users.get(client.sessionId);
  }

  deleteUser(client: Client) {
    return this.state.users.delete(client.sessionId);
  }

  getPlayerInTurn() {
    let playerInTurn = undefined as PlayerSchema | undefined;
    this.state.players.forEach(p => {
      if (p.isInTurn) playerInTurn = p;
    })

    return playerInTurn;
  }

  getHost() {
    let userHost = undefined as UserSchema | undefined;

    this.state.users.forEach(user => {
      if (user.isHost) userHost = user;
    })

    return userHost;
  }

  checkResult(): MatchResult | undefined {
    if (this.state.timeRemain <= 0) return {
      isDraw: true,
      players: [],
      users: [],
    }

    let players: PlayerSchema[] = [];
    this.state.players.forEach(p => players.push(p));

    let users: UserSchema[] = [];
    this.state.users.forEach(p => users.push(p));

    let totalHpOfTeamA = 0;
    let totalHpOfTeamB = 0;

    players.map((p) => {
      if (p.teamId === 'A') totalHpOfTeamA += p.remainHp;
      if (p.teamId === 'B') totalHpOfTeamB += p.remainHp;
    })

    if (!!!totalHpOfTeamA || !!!totalHpOfTeamB) {
      const playerResult = players.map(v => ({
        ...v,
        isWin: v.teamId === 'A' ? !!!totalHpOfTeamB : !!!totalHpOfTeamA,
      }));

      return {
        isDraw: false,
        players: playerResult.map((p) => ({
          id: p.id,
          isWin: p.isWin,
          teamId: p.teamId,
          controller: p.controller
        })),
        users: users.map(u => ({
          id: u.userId,
          teamId: u.teamId,
          isWin: playerResult.filter(p => p.controller === u.userId).every(v => v.isWin),
        }))
      }
    }

    return undefined;
  }

  async startPlayerTurn(player: PlayerSchema, delay = 2000) {
    player.isInTurn = true;
    this.broadcast(GameEvent.SERVER_PLAYER_TURN, player.id);
    await wait(delay);

    await new Promise((resolve) => {
      let listeners: EmitterItem[] = [];
      const stopAllListeners = () => listeners.map(v => v.destroy());

      // ======================= Time Out =======================
      this.state.turnTimeRemain = this.mapConfig.totalTurnTime;
      this.turnTimer = this.clock.setInterval(() => {
        if (this.state.turnTimeRemain === 0) {
          player.isInTurn = false;
          this.turnTimer?.clear();
          this.broadcast(GameEvent.SERVER_PLAYER_TURN_TIMEOUT);
          player.stopMove();
          resolve(true);
        } else {
          this.state.turnTimeRemain -= 1;
        }
      }, 1000);

      // ======================= User Actions =======================
      listeners.push(this.emitter.on(GameEvent.USER_PLAYER_USE_SKILL, ({ client, payload: skillId }) => {
        const playerInTurn = this.getPlayerInTurn();
        const user = this.getUser(client);

        if (
          !playerInTurn
          || !user
          || playerInTurn.controller !== user.userId
        ) return;

        player.useSkill({ skillId, matchRoom: this });
      }));

      listeners.push(this.emitter.on(GameEvent.USER_PLAYER_MOVE, ({ client, payload }) => {
        const user = this.getUser(client);

        if (
          !player
          || !user
          || player.controller !== user.userId
        ) return;

        player.move(payload);
      }));

      listeners.push(this.emitter.on(GameEvent.USER_PLAYER_STOP_MOVE, ({ client, payload }) => {
        const user = this.getUser(client);

        if (
          !player
          || !user
          || player.controller !== user.userId
        ) return;

        player.stopMove();
      }));

      listeners.push(this.emitter.on(GameEvent.USER_PLAYER_INCREASE_RULER_ANGLE, ({ client }) => {
        const playerInTurn = this.getPlayerInTurn();
        const user = this.getUser(client);

        if (
          !playerInTurn
          || !user
          || playerInTurn.controller !== user.userId
        ) return;

        playerInTurn.increaseRulerAngle();
      }))

      listeners.push(this.emitter.on(GameEvent.USER_PLAYER_DECREASE_RULER_ANGLE, ({ client }) => {
        const playerInTurn = this.getPlayerInTurn();
        const user = this.getUser(client);

        if (
          !playerInTurn
          || !user
          || playerInTurn.controller !== user.userId
        ) return;

        playerInTurn.decreaseRulerAngle();
      }))

      listeners.push(this.emitter.once(GameEvent.USER_PLAYER_SHOT, async (data) => {
        const { client } = data;
        const payload = data.payload as PlayerShotPayload;

        const user = this.getUser(client);

        // Validate
        if (
          !player
          || !user
          || player.controller !== user.userId
          || !payload
          || typeof payload.strengthPercent !== 'number'
        )
          return;

        this.turnTimer?.pause();
        stopAllListeners();
        await player.performSkill({
          matchRoom: this,
          strengthPercent: payload.strengthPercent,
          dataPixel: payload.dataPixel,
        });

        resolve(true);
      }))
    })

    player.isInTurn = false;
    this.state.turnTimeRemain = 0;
  }

  async performNpcTurn(player: PlayerSchema, params: { playerEffecteds: PlayerEffected[], skillId: NpcSkillId }) {
    player.isInTurn = true;

    const performParams: PerformNpcSkillParams = {
      from: {
        id: player.id, size: player.size, x: player.x, y: player.y,
        teamId: player.teamId,
      },
      ...params,
    }

    let userCompletedCount = 0;
    await new Promise((resolve) => {
      const listener = this.emitter.on(GameEvent.USER_PERFORM_NPC_TURN_COMPLETED, ({ client }) => {
        const user = this.getUser(client);
        if (!user) return;
        userCompletedCount += 1;

        if (userCompletedCount === this.state.users.size) {
          params.playerEffecteds.map(({ id, damage }) => {
            const player = this.state.players.get(id);
            if (player) player.minusHp(damage);
          })
          listener.destroy();
          resolve(true);
        }
      })

      this.broadcast(GameEvent.SERVER_PERFORM_NPC_TURN, performParams);
    })

    player.isInTurn = false;
  }
}
