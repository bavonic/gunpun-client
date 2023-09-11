import { ButtonTweens } from "game-play-v2/components/ButtonTweens";
import { sizeScene } from "game-play-v2/game-type";
import { GameContext } from "game-play-v2/services/game-context";
import { MapConfig, MapMode } from "modules/maps";

export class pve extends Phaser.Scene {
  network: GameContext;
  map: MapConfig[]
  mapIndex: MapConfig
  constructor() {
    super('pve');
  }

  init(data) {
    try {
      this.map = data.filter(v => v.mode === MapMode.DEMO_PVE);
    } catch (e) {
      console.log(e)
      return
    }
  }

  preload() {
    this.map.map((i, index) => {
      this.load.image(i.id, `/game-v2/game/pve/map_${index}.png`)
    })
  }

  create() {
    if (!this.network) {
      this.network = new GameContext(this);
    }
    this.createRoom();
    this.createListMap();
  }

  createRoom() {
    const atlasTexture = this.textures.get('assets');
    const frames = atlasTexture.getFrameNames();

    this.add.image(0, 0, 'assets', 'background.png').setOrigin(0);
    const btnBack = new ButtonTweens({
      scene: this, x: 0, y: 53, texture: 'assets', frame: 'btn-back.png', fn: () => {
        this.scene.stop('pve')
        this.scene.start('SceneLobby');
      }
    }).setOrigin(0);

    this.add.image(53, 171, 'assets', frames[1]).setOrigin(0);

    const btnPlay = new ButtonTweens({
      scene: this, x: sizeScene.width - 324, y: sizeScene.height - 155, texture: 'assets', frame: 'btn-play.png', fn: () => {
        this.handleCreateMap(this.mapIndex);
      }
    })
  }

  createListMap() {
    let cards = [];

    const border = this.add.rectangle(0, 0, 515, 335).setOrigin(0);
    border.setStrokeStyle(4, 0x4BE3FF);

    this.map.map((map, index) => {
      const container = this.add.container(0, 0)
      const img = this.add.image(0, 0, map.id).setOrigin(0).setInteractive();
      const box = this.add.rectangle(0, 240, 510, 90, 0x000000).setAlpha(0.7).setOrigin(0);
      const text = this.add.text(0, 265, map.name)
      text.setFontFamily('Oswald');
      text.setFontSize(40);
      text.x = 255 - (text.width / 2);

      container.add([img, box, text])
      img.on('pointerdown', () => {
        this.mapIndex = map;
        border.x = container.x - 2
        border.y = container.y - 2.5
      })
      container.setAlpha(0.3);
      cards.push(container)
    })

    this.add.tween({
      targets: cards,
      alpha: 1,
      duration: 1000,
      onComplete: i => {
        i.destroy();
      }
    })

    Phaser.Actions.GridAlign(cards, {
      width: 3,
      height: 2,
      cellWidth: 580,
      cellHeight: 340,
      x: (sizeScene.width - ((580 * 3) - 70)) / 2,
      y: 288
    });

    this.mapIndex = this.map[0];
    border.x = cards[0].x - 2
    border.y = cards[0].y - 2.5
  }

  async handleCreateMap(map: MapConfig) {
    try {
      // onLoad({ percent: 0, background: map.assetUrl + '/background.png', message: 'Initialize new game...' });
      await this.network.createMatchRoom({
        mapId: map.id,
        loadBackground: map.assetUrl + '/background.png',
      });
      await this.network.startMatchRoom();
    } catch (error) {
      console.error(error);
    }
  }

  tweensCamera() {
    const camera = this.cameras.main;
    camera.setAlpha(0.5)
    this.tweens.add({
      targets: camera,
      alpha: 1,
      duration: 1000,
      onComplete: i => {
        i.destroy();
      }
    });
  }
}