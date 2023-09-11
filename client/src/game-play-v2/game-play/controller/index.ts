import { PlayerEvent } from "game-play-v2/game-play/players/player.types";
import { sizeScene } from "game-play-v2/game-type";
import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";
import { game_v2 } from "screens/game-v2";

export class ControlsGame {
  gem: Phaser.GameObjects.Sprite;
  player!: any;
  width: number | any;
  height: number | any;
  scene: Phaser.Scene;
  soundPower: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  async create() {
    this.width = 1920
    this.height = 1080
    this.createControls();
    this.createBar();
  }
  createBar() {
    this.soundPower = this.scene.sound.add('power-space');
    this.soundPower.setLoop(true);
    //
    const scene_Game = game_v2.scene.getScene('MapScene') as MatchScene;
    //
    const box = this.scene.add.graphics();
    box.fillStyle(0x000000, 0.6);
    box.fillRoundedRect(sizeScene.width / 6 + 50,  sizeScene.height - 150, 1280, 120, 10).setScrollFactor(0);
    // box.setAlpha(0.6);
    //ruler 
    const container = this.scene.add.container(this.width / 5, this.height - 100).setScale((this.width - ((this.width / 5) * 2)) / this.width)
    container.setScrollFactor(0);
    const imgRuler = this.scene.add.image(0, 0, 'controls', 'ruler.png').setOrigin(0);
    imgRuler.setScale(1.3);
    //power bar
    const barRemember = this.scene.add.graphics();
    const sizeBar = imgRuler.width - 10;
    //box power bar
    const fill = this.scene.add.nineslice(5, 55, 'controls', 'fill.png', 0, 0, 0, 0).setScale(1.3);
    fill.setOrigin(0, 0.5);
    container.add([barRemember, fill, imgRuler])
    // const fragmentShader3 = ` precision mediump float; uniform float time; uniform vec2 resolution; uniform vec2 mouse; varying vec2 fragCoord; void main (void) { float intensity = 0.; for (float i = 0.; i < 54.; i++) { float angle = i/27. * 3.14159; vec2 xy = vec2(0.27 * cos(angle), 0.27 * sin(angle)); xy += fragCoord.xy/resolution.y-0.5; intensity += pow(1000000., (0.77 - length(xy) * 1.9) * (1. + 0.275 * fract(-i / 27. - time))) / 80000.; } gl_FragColor = vec4(clamp(intensity * vec3(0.0777, 0.196, 0.27), vec3(0.), vec3(1.)), 0.); } `;
    const tweens = this.scene.tweens.add({
      targets: fill,
      width: sizeBar - 5,
      duration: 3500,
      ease: 'sine.inout',
      yoyo: true,
      repeat: -1,
    }).pause();
    const btnPower = this.scene.add.image(0, 0, 'controls', 'btnPower.png').setInteractive().setScale(0.5).setScrollFactor(0);
    // const basesShader2 = new Phaser.Display.BaseShader('BufferShader2', fragmentShader3);

    // const shader2 = this.scene.add.shader(basesShader2, 400, 400, 256, 256).setScrollFactor(0).setVisible(false);
    // this.scene.tweens.add({
    //   targets: shader2,
    //   scaleX: 1,
    //   scaleY: 1,
    //   repeat: -1,
    //   yoyo: true,
    //   duration: 2000,
    // });
    this.scene.add.container(this.width * 0.93, this.height * 0.88, [ btnPower]);

    scene_Game.players.map((player) => {
      player.events.on(PlayerEvent.IN_TURN, () => {
        if (player.isAbleToControl) {
          this.player = player;
        }
      })
    });

    const keys = this.scene.input.keyboard.addKeys('SPACE') as any;
    keys.SPACE.on('down', () => {
      // shader2.setPosition(btnPower.x, btnPower.y);
      // shader2.setVisible(true);
      tweens.restart();
      dataPixel = this.getMapPixel();
      this.soundPower.play();
    });
    keys.SPACE.on('up', () => {
      this.soundPower.stop();
      // shader2.setVisible(false);
      tweens.pause();
      const total = tweens.data[0] as any
      const current = tweens.data[0] as any
      barRemember.clear();
      barRemember.setAlpha(0.7);
      barRemember.fillStyle(0xffff00);
      barRemember.fillRect(5, fill.y - 27, (total.end * (current.current / total.end)) * 1.3, 51);
      this.player?.shot(100 * (current.current / total.end), dataPixel);
    })
    let dataPixel = []
    btnPower.on('pointerdown', () => {
      // shader2.setPosition(btnPower.x, btnPower.y);
      // shader2.setVisible(true);
      tweens.restart();
      dataPixel = this.getMapPixel();
      this.soundPower.play();
    });

    btnPower.on('pointerup', () => {
      this.soundPower.stop();
      // shader2.setVisible(false);
      tweens.pause();
      const total = tweens.data[0] as any
      const current = tweens.data[0] as any
      barRemember.clear();
      barRemember.setAlpha(0.7);
      barRemember.fillStyle(0xffff00);
      barRemember.fillRect(5, fill.y - 27, (total.end * (current.current / total.end)) * 1.3, 51);
      this.player?.shot(100 * (current.current / total.end), dataPixel);
    });
  }
  createControls() {
    const btnLeft = this.scene.add.image(- 80, 0, 'controls', 'btnDirectional.png').setAngle(-90).setScrollFactor(0).setInteractive();
    const btnRight = this.scene.add.image(80, 0, 'controls', 'btnDirectional.png').setAngle(90).setScrollFactor(0).setInteractive();
    const btnUp = this.scene.add.image(0, - 80, 'controls', 'btnDirectional.png').setScrollFactor(0).setInteractive();
    const btnDown = this.scene.add.image(0, 80, 'controls', 'btnDirectional.png').setScrollFactor(0).setAngle(180).setInteractive();

    const background = this.scene.add.circle(0, 0, 170, 0x000000).setAlpha(0.6);
    const bg_0 = this.scene.add.image(0, 0, 'controls', 'bg_0.png').setScale(1.1)
    const bg_1 = this.scene.add.image(0, 0, 'controls', 'bg_1.png').setScale(1.2)

    const container = this.scene.add.container(this.width * 0.1, this.height * 0.83);
    container.add([background, bg_0, bg_1, btnRight, btnLeft, btnUp, btnDown])
    container.setScrollFactor(0);

    btnLeft.on('pointerdown', () => {
      btnLeft.setScale(0.8)
      this.player?.moveLeft()
    })
    btnLeft.on('pointerup', () => {
      btnLeft.setScale(1)
      this.player?.stopMove()
    })
    btnRight.on('pointerdown', () => {
      btnRight.setScale(0.8)
      this.player?.moveRight()
    })
    btnRight.on('pointerup', () => {
      btnRight.setScale(1)
      this.player?.stopMove()
    })
    btnUp.on('pointerdown', () => {
      btnUp.setScale(0.8)
      this.player?.increaseRulerAngle()
    })
    btnUp.on('pointerup', () => {
      btnUp.setScale(1)
    })
    btnDown.on('pointerdown', () => {
      btnDown.setScale(0.8)
      this.player?.decreaseRulerAngle()
    })
    btnDown.on('pointerup', () => {
      btnDown.setScale(1)
    })

    this.controlsKeyboard(btnUp, btnLeft, btnRight, btnDown);
  }
  controlsKeyboard(btnUp, btnLeft, btnRight, btnDown) {
    const keys = this.scene.input.keyboard.addKeys('W,S,A,D') as any;

    keys.W.on('down', (event) => {
      btnUp.setScale(0.8)
      this.player?.increaseRulerAngle()
    });
    keys.W.on('up', (event) => {
      btnUp.setScale(1)
    })

    keys.A.on('down', () => {
      btnLeft.setScale(0.8)
      this.player?.moveLeft()
    })
    keys.A.on('up', () => {
      btnLeft.setScale(1)
      this.player?.stopMove()
    })
    keys.D.on('down', () => {
      btnRight.setScale(0.8)
      this.player?.moveRight()
    })
    keys.D.on('up', () => {
      btnRight.setScale(1)
      this.player?.stopMove()
    })
    keys.S.on('down', () => {
      btnDown.setScale(0.8)
      this.player?.decreaseRulerAngle()
    })
    keys.S.on('up', () => {
      btnDown.setScale(1)
    })
  }
  getMapPixel() {
    //get character npc with canvas pixel
    const pixel = new Phaser.Display.Color() as any;
    const dataPixel = [];
    const targets = [];
    const MatchScene = this.scene as MatchScene;

    MatchScene.players
      .filter((v) => v.asset.key === "DefaultPlayer")
      .map((i) => {
        targets.push({ x: i.object.x, y: i.object.y });
      });
    targets.map((i) => {
      // for (let y = 0; y < MatchScene.mapConfig.height; y++) {
      //   for (let x = 0; x < MatchScene.mapConfig.width; x++) {
      //     MatchScene.canvas?.getPixel(x, y, pixel);
      //     if (pixel.a > 0) {
      //       if (
      //         i.x - 150 < x &&
      //         x < i.x + 150 &&
      //         i.y - 100 < y &&
      //         y < i.y + 100
      //       ) {
      //         if (x % 12 == 0 && y % 12 == 0) {
      //           dataPixel.push({ x, y });
      //         }
      //       }
      //     }
      //   }
      // }
      MatchScene.platforms.children.entries.forEach((item: any) => {
        if (
          i.x - 150 < item.x &&
          item.x < i.x + 150 &&
          i.y - 100 < item.y &&
          item.y < i.y + 100
        ) {
          if (item.x % 12 == 0 && item.y % 12 == 0) {
            dataPixel.push({ x: item.x, y: item.y });
          }
        }
      })
    });
    return dataPixel
  }
}