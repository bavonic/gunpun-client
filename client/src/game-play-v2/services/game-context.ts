import { wait } from '@testing-library/user-event/dist/utils';
import { Room } from 'colyseus.js';
import { MatchScene } from 'game-play-v2/scenes/main-monitor/game/match-game/match.scene';
import { Emitter } from 'game-play-v2/game-play/emitter';
import { gameClient } from 'index';
import { AccessTokenModule } from 'modules/account';
import { CreateMatchRoom, GameEvent, GamePlayContext, GameUser } from 'game-play-v2/game-play/game-play.types';
import { PlayerSkillId } from 'game-play-v2/game-play/skills/skills.types';
import { MapConfig } from 'modules/maps';
import { game_v2 } from 'screens/game-v2';
import { SceneLoading } from 'game-play-v2/scenes/sub-monitor/SceneLoading';
import { SceneSelectSkill } from 'game-play-v2/scenes/sub-monitor/SceneSelectSkill';
import { SceneWaitingRoom } from 'game-play-v2/scenes/sub-monitor/SceneWaitingRoom';
import { pvp } from 'game-play-v2/scenes/main-monitor/game/map/pvp';
import { SceneController } from 'game-play-v2/scenes/sub-monitor/SceneController';

export const gamePlayEmitter = new Emitter();

export class GameContext {
  scene: Phaser.Scene;
  roomActive: Room<any>;
  game: MatchScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  setupMatchRoom = async (room: Room<any>) => {
    this.roomActive = room;
    this.scene.scene.remove('MapScene');
    this.scene.scene.remove('SceneController');
    this.scene.scene.add('MapScene', MatchScene);
    await wait(100);

    room.onLeave((code) => {
      gamePlayEmitter.emit('ON_LEAVE_ROOM', code);
      // sounds.stopAll();
      // sounds.play('background');
    });

    room.onMessage(GameEvent.SERVER_START_USERS_PREPARING, () => {
      const sceneGame = this.scene.scene.start('MapScene', { room });
      this.game = game_v2.scene.getScene('MapScene') as MatchScene;
      this.scene.scene.start('SceneSelectSkill', { room: room })
    })

    room.onMessage(GameEvent.SERVER_INITIALIZE_MATCH, () => {
      const scene = game_v2.scene.getScene('SceneSelectSkill');
      scene.scene.start('SceneLoading')
    })

    room.onMessage(GameEvent.SERVER_PRELOAD_ASSETS, async (params) => {
      const mapConfig = params.mapConfig as MapConfig;
      const background = mapConfig.assetUrl + '/background.png';

      await wait(1500);
      this.game.preloadAssets({
        mapConfig,
      })
    })

    room.onMessage(GameEvent.SERVER_PERFORM_INTRO, () => {
      // offLoad();
      // sounds.play('map_1_background');
      this.game.performIntro()
        .then(() => room.send(GameEvent.USER_PERFORM_INTRO_COMPLETED));
    })

    room.onMessage(GameEvent.SERVER_PERFORM_PLAYER_TURN, (params) => {
      this.game.performPlayerSkill(params)
        .then(() => room.send(GameEvent.USER_PERFORM_PLAYER_TURN_COMPLETED));
    })

    room.onMessage(GameEvent.SERVER_PLAYER_USE_SKILL, (params) => {
      this.game.playerUseSkill(params)
    })

    room.onMessage(GameEvent.SERVER_PERFORM_NPC_TURN, (params) => {
      this.game.performNpcSkill(params)
        .then(() => room.send(GameEvent.USER_PERFORM_NPC_TURN_COMPLETED));
    })

    room.onMessage(GameEvent.SERVER_PLAYER_TURN, (playerId) => {
      this.game.playerTurn(playerId);
    })

    room.onMessage(GameEvent.SERVER_PLAYER_TURN_TIMEOUT, () => {
      this.game.cameraStopFollow();
    })

    room.onMessage(GameEvent.SERVER_MATCH_FINISHED, (result) => {
      this.game.performMatchResult(result)
        .then(() => {
          this.leaveMatchRoom();
        })
    })



    room.onMessage(GameEvent.HOST_WAITING_ROOM, async () => {
      const scene = await game_v2.scene.getScene('SceneWaitingRoom') as SceneWaitingRoom
      await wait(1000);
      scene.scene.start('pvp');
      scene.scene.stop();
    })

    room.onMessage(GameEvent.OUT_WAITING_ROOM, async () => {
      const scene = await game_v2.scene.getScene('SceneWaitingRoom') as SceneWaitingRoom
      await wait(1000);
      scene.scene.restart();
    })

    room.onMessage(GameEvent.JOIN_WAITING_ROOM, async () => {
      const scene = await game_v2.scene.getScene('SceneWaitingRoom') as SceneWaitingRoom
      scene.scene.restart();
    })
  }

  joinMatchRoom = async (roomId: string, params?: any) => {
    const room = await gameClient.joinById(roomId, {
      ...params,
      auth: AccessTokenModule.get(),
    });
    await this.setupMatchRoom(room);
    this.joinWaitingRoom(room);
    return room;
  }

  createMatchRoom: CreateMatchRoom = async (payload) => {
    const room = await gameClient.create(payload.mapId, {
      ...payload.params,
      auth: AccessTokenModule.get(),
    });
    await this.setupMatchRoom(room);
    const scene = game_v2.scene.getScene('SceneWaitingRoom') as SceneWaitingRoom
    if (scene) scene.room = room
    return room;
  }

  joinWaitingRoom(room) {
    const scene = game_v2.scene.getScene('SceneWaitingRoom') as SceneWaitingRoom
    if (scene) scene.room = room
    room.send(GameEvent.JOIN_WAITING_ROOM)
  }

  startMatchRoom = async () => {
    if (this.roomActive) this.roomActive.send(GameEvent.USER_START);
  }

  leaveMatchRoom = async () => {
    if (this.roomActive) this.roomActive.leave();
  }

  onSelectSkills = (skilIds: PlayerSkillId[]) => {
    if (this.roomActive) this.roomActive.send(GameEvent.USER_SELECT_SKILLS, skilIds);
  }
}