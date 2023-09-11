import { ButtonTweens } from "game-play-v2/components/ButtonTweens";
import { sizeScene } from "game-play-v2/game-type";

export class SceneUpgrade extends Phaser.Scene {
  listItem: Phaser.GameObjects.Image[]
  sound_1: any
  sound_2: any
  sound_3: any
  container: any

  constructor() {
    super('SceneUpgrade')
  }
  create() {
    this.add.image(0, 0, 'assets', 'background.png').setOrigin(0);
    this.chooseItem();
    this.listItem = [];

    this.sound_1 = this.sound.add('complete')
    this.sound_2 = this.sound.add('updrage');
    this.sound_3 = this.sound.add('electonic');

    this.anims.create({
      key: 'thunder',
      frameRate: 10,
      frames: this.anims.generateFrameNames('thunder', {
        prefix: 'thunder_',
        suffix: '.png',
        start: 4,
        end: 31,
      }),
      repeat: -1
    });
  }

  chooseItem() {
    this.container = this.add.container(sizeScene.width / 2, sizeScene.height - 200);
    const box = this.add.rectangle(0, 0, 800, 300, 0x000000).setAlpha(0.8);
    const box_1 = this.add.image(-250, 0, 'updrade', 'box.png');
    const box_2 = this.add.image(0, 0, 'updrade', 'box.png');
    const box_3 = this.add.image(250, 0, 'updrade', 'box.png');

    const item_1 = new ButtonTweens({
      scene: this, x: -250, y: 0, texture: 'updrade', frame: 'lv2_item.png', fn: () => {
        this.setItem(item_1, sizeScene.width / 2 - 300);
        item_1.disableInteractive();
        item_1.setAlpha(0);
      }
    });

    const item_2 = new ButtonTweens({
      scene: this, x: 0, y: 0, texture: 'updrade', frame: 'lv2_item.png', fn: () => {
        this.setItem(item_2, sizeScene.width / 2 + 300);
        item_2.disableInteractive();
        item_2.setAlpha(0);
      }
    });
    this.container.add([box, box_1, box_2, box_3, item_1, item_2])
  }

  setItem(ob, x) {
    const img = this.add.image(x, sizeScene.height / 3, 'updrade', 'lv2.png').setInteractive();
    const thunder = this.add.sprite(x, sizeScene.height / 3, 'thunder').play('thunder').setScale(2.5).setRotation(1)

    const tweens = this.tweens.add({
      targets: img,
      y: { from: sizeScene.height / 3, to: sizeScene.height / 3 - 10 },
      yoyo: true,
      repeat: -1,
      duration: 500,
    })
    img.on('pointerdown', async () => {
      await img.destroy();
      await thunder.destroy();
      await tweens.destroy();
      await ob.setInteractive();
      ob.setAlpha(1);
    });
    this.listItem.push(img)

    if (this.listItem.length > 1) {
      this.upgrade();
    }
  }

  upgrade() {
    const btn = new ButtonTweens({
      scene: this, x: sizeScene.width / 2, y: sizeScene.height / 1.6, texture: 'updrade', frame: 'btn_updrade.png', fn: () => {
        this.listItem.map(i => {
          this.sound.stopAll();
          this.sound_2.play();
          this.tweens.add({
            targets: i,
            x: { from: i.x, to: sizeScene.width / 2 },
            alpha: 0,
            angle: '+=360',
            yoyo: false,
            duration: 300,
            onActive: () => {
              this.sound_3.play()
              this.sound_3.setLoop(true);
              btn.destroy();
              this.container.destroy();
            },
            onComplete: async (tweens) => {
              tweens.destroy();
              i.destroy();
              this.sound_2.stop();
              this.endUpgrade();
            }
          })
        })
      }
    });
  }

  async endUpgrade() {
    const img = this.add.image(0, 0, 'updrade', 'lv3.png').setScale(0.4).setInteractive();
    img.setAlpha(0);
    this.add.container(sizeScene.width / 2, sizeScene.height / 3, [img])
    const emitZone1 = { type: 'edge', source: img.getBounds(), quantity: 14 };
    const emitter = this.add.particles(0, 0, 'flare', {
      speed: 100,
      lifespan: 2000,
      quantity: 1,
      scale: { start: 0.5, end: 0 },
      emitZone: emitZone1,
      duration: 200,
      emitting: false,
    });

    this.tweens.add({
      targets: img,
      scale: 1,
      alpha: 1,
      yoyo: false,
      onActive: () => {
        this.sound_1.play();
        emitter.start(2000);
      },
      onComplete: async (tweens) => {
        tweens.destroy();
        this.sound.stopAll();
        this.tweens.add({
          targets: img,
          scale: { from: 0.95, to: 1 },
          yoyo: true,
          repeat: -1,
          duration: 500,
        })
        this.add.sprite(sizeScene.width / 2, sizeScene.height / 3, 'thunder').play('thunder').setScale(2.5).setRotation(1);
        new ButtonTweens({
          scene: this, x: sizeScene.width / 2, y: sizeScene.height / 1.5, texture: 'updrade', frame: 'btn_done.png', fn: () => {
            this.scene.stop('SceneUpgrade')
            this.scene.start('SceneLobby');
          }
        })
      }
    })
  }

}