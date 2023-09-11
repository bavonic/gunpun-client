import { loadAsset } from "game-play-v2/game-play/game-play.assets";

import { Player } from "../player.core";
import { PlayerEvent, PlayerSchema } from "../player.types";
import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";

const headSize = 300;

export class PersonalPlayer extends Player {
  head: Phaser.GameObjects.Container;
  graphics: Phaser.GameObjects.Graphics;
  image: Phaser.GameObjects.Image;
  tweenHead: Phaser.Tweens.Tween;

  eventEmitters: Phaser.Events.EventEmitter[] = [];

  constructor(params: {
    schema: PlayerSchema;
  }) {
    super({
      ...params,
      asset: {
        key: "PersonalPlayer",
        url: '/images/players/personal/assets'
      },
    });

    try {
      this.avatar = JSON.parse(this.schema.data).avatar + '?size=300x300&fit=cover';
    } catch (error) {
      this.avatar = '/images/avatars/1.png'
    }
  }

  override preload(scene: MatchScene | Phaser.Scene): void {
    super.preload(scene);
    loadAsset(scene, { key: this.schema.id, type: 'image', url: this.avatar });
    loadAsset(scene, { key: 'class', type: 'image', url: '/elements/character/glass.png' });
  }

  override initialize(): void {
    super.initialize();

    this.head = this.scene.add.container(0, 0);
    this.graphics = this.scene.add.graphics();
    this.graphics.fillStyle(0xffffff, 0.1);
    this.graphics.fillCircle(0, 0, 256);
    this.graphics.setScale(this.schema.size / 20);

    const r3 = this.scene.add.circle(0, 0, 80).setScale(1.6);
    r3.setStrokeStyle(8, 0x1a65ac, 0.8);

    const avatar = this.scene.add.image(-20, 0, 'class').setScale(this.schema.size / 20);
    this.image = this.scene.add.image(0, 0, this.schema.id);

    this.head.add([this.image, avatar, r3]);
    this.head.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.graphics);
    this.head.setScale(this.schema.size / 10)

    // this.updateHead();
    // animation head
    this.tweenHead = this.scene.tweens.add({
      targets: [this.graphics, this.head],
      // y: { start: this.object.y + 25, to: this.object.y + 30 },
      // scale: this.schema.size / 10,
      angle: { start: -1, to: 2 },
      alpha: 0.8,
      ease: 'sine.inout',
      yoyo: true,
      repeat: -1,
      duration: 400
    })

    // this.scene.add.container(0, 0, [this.head, this.object])


    this.events.on(PlayerEvent.CHANGE_POSITION, (() => {
      this.updateHead();
    }));

    this.events.on(PlayerEvent.STOP_MOVE, (async () => {
      // this.tweenHead.play();
    }));

    this.events.on(PlayerEvent.MOVING, (() => {
      // this.tweenHead.pause();
    }));

    this.events.on(PlayerEvent.MINUS_HP, (() => {
      if (this.hp <= 0) {
        const x = this.isFlip ? -150 : 150
        this.scene.tweens.add({
          targets: [this.head, this.graphics],
          ease: 'Quad.easeOut',
          props: {
            x: { value: '+=' + x },
            y: { value: this.object.y + 40 },
            angle: 90,
          },
          yoyo: false,
          repeat: 0,
          duration: 500,
          callbackScope: this,
          onComplete: (i) => {
            i.remove();
          }
        });
      }
    }));

    this.events.on(PlayerEvent.COLLIDER, (() => {
      this.image.setTint(0xff0000);
      this.scene.time.addEvent({
        delay: 500, callback: () => {
          this.image.clearTint();
        }, callbackScope: this
      });
    }));

  }

  updateHead() {
    this.graphics.x = this.object.x - (this.isFlip ? -20 : this.object.body.width * 0.2);
    this.graphics.y = this.object.y - this.object.body.height * 0.3;
    this.head.x = this.object.x - (this.isFlip ? -20 : this.object.body.width * 0.2);
    this.head.y = this.object.y - this.object.body.height * 0.3;
    this.image.setFlipX(this.isFlip);
  }

  override flip(value: boolean): void {
    super.flip(value);
  }
}