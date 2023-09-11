import { wait } from "game-play-v2/game-play/game-play.utils";
import { SceneLogin } from "./SceneLogin";
import { game_v2 } from "screens/game-v2";
import { SceneWaitingRoom } from "./SceneWaitingRoom";
import { SceneLoading } from "./SceneLoading";
import { pvp } from "../main-monitor/game/map/pvp";
import { pve } from "../main-monitor/game/map/pve";
import { SceneSelectSkill } from "./SceneSelectSkill";
import { SceneUpgrade } from "./SceneUpgrade";
import { SceneStore } from "../main-monitor/store/SceneStore";
import { SceneInfoUser } from "./SceneInfoUser";

export class SceneLoadAssets extends Phaser.Scene {
  constructor() {
    super('SceneLoadAssets')
  }
  preload() {
    this.load.atlas('login-assets', '/game-v2/login/asset-login.png', '/game-v2/login/asset-login.json');
    this.load.atlas('character-assets', '/game-v2/login/character-assets.png', '/game-v2/login/character-assets.json');
    this.load.atlas('assets', '/game-v2/game/pve/pve.png', '/game-v2/game/pve/pve.json');
    this.load.atlas('skills', '/game-v2/game/assets/skill.png', '/game-v2/game/assets/skill.json');
    this.load.atlas('controls', '/game-v2/game/assets/controls.png', '/game-v2/game/assets/controls.json');
    this.load.atlas('lobby', '/game-v2/game/assets/lobby.png', '/game-v2/game/assets/lobby.json');
    this.load.atlas('arena', '/game-v2/game/assets/arena.png', '/game-v2/game/assets/arena.json');
    this.load.atlas('info-assets', '/game-v2/game/assets/info-assets.png', '/game-v2/game/assets/info-assets.json');
    this.load.atlas('waiting-room', '/game-v2/game/assets/waiting-room.png', '/game-v2/game/assets/waiting-room.json');
    this.load.atlas('end-game', '/game-v2/game/assets/end_game.png', '/game-v2/game/assets/end_game.json');
    this.load.atlas('select-skill', '/game-v2/game/assets/select-skill.png', '/game-v2/game/assets/select-skill.json');
    this.load.atlas('updrade', '/game-v2/game/upgrade.png', '/game-v2/game/upgrade.json');
    this.load.atlas('item_store', '/game-v2/game/item_store.png', '/game-v2/game/item_store.json');
    this.load.atlas('items', '/game-v2/game/item.png', '/game-v2/game/item.json');
    this.load.atlas('thunder', '/game-v2/animations/thunder.png', '/game-v2/animations/thunder.json');
    this.load.image('flare', '/game-v2/game/white-flare.png');
    this.load.html('nameform', '/game-v2/login/input/formInput.html');
    //
    this.load.plugin('rexcanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasplugin.min.js', true);
    this.load.plugin('rexfilechooserplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfilechooserplugin.min.js', true);
    this.load.plugin('rexmodalplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmodalplugin.min.js', true);
    this.load.plugin('rexscrollerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscrollerplugin.min.js', true);
    //
    this.load.audio('click', '/sounds/click.wav');
    this.load.audio('background', '/sounds/background.mp3');
    //sound match room
    this.load.audio('in-game-background', '/sounds/map_1_background.mp3');
    this.load.audio('my-turn', '/sounds/my-turn.mp3');
    this.load.audio('shot', '/sounds/shot.wav');
    this.load.audio('enemy-shot', '/sounds/pun_woo_hoo.mp3');
    this.load.audio('collide', '/sounds/collide.wav');
    this.load.audio('move', '/sounds/move.wav');
    this.load.audio('power-space', '/sounds/force-bar.wav');
    this.load.audio('end-turn', '/sounds/endTurn.wav');
    this.load.audio('you_Win', '/sounds/youWin.wav');
    this.load.audio('end_defeat', '/sounds/end_defeat.wav');
    //
    this.load.audio('complete', '/sounds/complete.mp3');
    this.load.audio('updrage', '/sounds/updrage.mp3');
    this.load.audio('electonic', '/sounds/electonic.wav');
  }

  async create(data) {
    if (data.test) return
    game_v2.scene.add('SceneWaitingRoom', SceneWaitingRoom);
    game_v2.scene.add('SceneLoading', SceneLoading);
    game_v2.scene.add('SceneSelectSkill', SceneSelectSkill);
    game_v2.scene.add('pvp', pvp);
    game_v2.scene.add('pve', pve);
    game_v2.scene.add('SceneUpgrade', SceneUpgrade);
    game_v2.scene.add('SceneInfoUser', SceneInfoUser);
    game_v2.scene.add('SceneStore', SceneStore);
    this.add.text(0, 0, '', { fontSize: 30, fontFamily: 'Oswald', align: 'center' });

    if (data) {
      this.scene.add('SceneLogin', SceneLogin);
      await wait(500);
      this.scene.start('SceneLogin', data);
    }
  }
}