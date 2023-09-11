import { Client } from "colyseus";
import { SkillModule } from "../skills/skills.module";
import { MatchRoom } from "../matchs.room";
import { GameEvent, MapBackgroundMode, MapConfig, MapMode } from "../matchs.types";
import { PlatformSchema } from "../schemas/platform.schema";
import { PlayerSchema, PlayerVariant } from "../schemas/player.schema";
import { UserSchema } from "../schemas/user.schema";
import { WeaponVariant } from "../../weapons/types";
import { mapConfigs } from "../matchs.router";

export class SkillChecking extends MatchRoom {
  static config: MapConfig = {
    id: "SkillChecking",
    name: "SkillChecking",
    assetUrl: '/demo/maps/1',
    width: 2645,
    height: 1080,
    backgroundMode: MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: MapMode.DEMO_SKILL,
    totalTime: 60 * 15,
    totalTurnTime: 15,
  }

  playerId: string;
  playerName: string;

  player: PlayerSchema;
  monster: PlayerSchema;

  onCreate(_?: any) {
    this.mapConfig = SkillChecking.config;
    this.ignoreAuth = true;
    return super.onCreate();
  }

  override async onAuth(client: Client, params?: any): Promise<UserSchema> {
    const user = new UserSchema({
      id: client.sessionId,
      userId: "EX",
      isHost: true,
      teamId: 'A',
      name: "Name",
      data: "",
      avatar: '',
    });
    this.state.users.set(user.id, user);
    return user;
  }

  async initialize() {
    // Player
    const host = this.getHost();
    const playerSkills = await SkillModule.getPlayerSkills("1");
    this.player = new PlayerSchema({
      id: "Tester",
      name: "Tester",
      variant: PlayerVariant.PERSONAL_I,
      weaponVariant: WeaponVariant.PERSONAL_I,
      x: 300,
      y: 500,
      size: 5.5,
      totalHp: 2000,
      speed: 3,
      teamId: 'A',
      controller: host.id,
      skillIds: playerSkills.map(v => v.id),
    });

    this.state.players.set(this.player.id, this.player);

    // Monster
    this.monster = new PlayerSchema({
      id: 'NPC',
      name: "NPC",
      size: 3.5,
      isFlip: true,
      x: 2300,
      y: 500,
      speed: 2,
      totalHp: 1000,
      teamId: 'B',
      controller: 'npc',
      skillIds: [],
    });
    this.state.players.set(this.monster.id, this.monster);

    // // Platforms
    // const width = SkillChecking.config.width;
    // const height = 350;

    // this.state.platforms.add(new PlatformSchema({
    //   id: 'platform',
    //   x: SkillChecking.config.width / 2,
    //   y: this.mapConfig.height - (height / 2),
    //   w: width,
    //   h: height,
    // }));

    // Required IMPORTANT!
    await super.initialize();
    this.broadcast('MAP_CONFIG', { data: mapConfigs })
  }

  async control() {
    this.player.isInTurn = true;
    this.broadcast(GameEvent.SERVER_PLAYER_TURN, this.player.id);

    this.emitter.on(GameEvent.USER_TEST_PLAYER_GET_SKILL_PARAMS, ({ client, payload }) => {
      const skillParams = this.player.getSkillParms({
        matchRoom: this, strengthPercent: payload.strengthPercent,
        targets: [this.monster],
        dataPixel: payload.dataPixel,
      });
      client.send(GameEvent.SERVER_TEST_PLAYER_RESPONSE_SKILL_PARAMS, skillParams);
    })

    this.emitter.on(GameEvent.USER_TEST_PLAYER_PERFORM_SKILL, ({ payload }) => {
      this.monster.remainHp = this.monster.totalHp;
      this.player.useSkill({ skillId: payload.skillId, matchRoom: this })
      this.player.performSkill({
        matchRoom: this,
        strengthPercent: payload.strengthPercent,
        dataPixel: payload.dataPixel,
        onSkillCheckingResult: (result) => {
          this.broadcast(GameEvent.SERVER_TEST_SKILL_CHECKING_RESULT, result)
        }
      })
    })

    await new Promise(() => { });
  }
}