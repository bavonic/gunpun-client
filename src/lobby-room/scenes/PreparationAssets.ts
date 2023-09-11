import Network from 'lobby-room/services/Network';
import { Scene } from 'phaser'

export default class LoadAssets extends Scene {
  network!: Network

  constructor() {
    super('PreparationAssets');
  }

  preload() {
    this.load.spritesheet('adam', '/game/demo/character/adam.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image('tiles', '/game/demo/lobby-map/map-1.png');
    this.load.tilemapTiledJSON('map', '/game/demo/lobby-map/map-1.json');

    const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);

    this.load.on('complete', () => {
      this.launchGame();
    })
  }

  init() {
    this.network = new Network();
  }

  launchGame() {
    this.scene.start('LobbyRoom', {
      network: this.network,
    })
  }
}
