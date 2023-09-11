import { sizeScene } from "game-play-v2/game-type";
import { PlayerEvent } from "game-play-v2/game-play/players/player.types";
import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";
import { game_v2 } from "screens/game-v2";
import { MatchPlayerSkill } from "game-play-v2/game-play/skills/skills.types";
import { Player } from "game-play-v2/game-play/players/player.core";
import { ButtonTweens } from "game-play-v2/components/ButtonTweens";
import { PlayerHealthBar } from "game-play-v2/game-play/players/ui/heathBar";

export class SceneController extends Phaser.Scene {
  gem: Phaser.GameObjects.Sprite;
  player!: any;
  MatchScene: MatchScene;
  soundPower: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;
  // control
  btnRight: Phaser.GameObjects.Image;
  btnLeft: Phaser.GameObjects.Image;
  btnUp: Phaser.GameObjects.Image;
  btnDown: Phaser.GameObjects.Image;
  btnPower: Phaser.GameObjects.Image;

  headLeft: Phaser.GameObjects.Image;
  headRight: Phaser.GameObjects.Image;



  constructor() {
    super('SceneController')
  }

  create() {
    this.MatchScene = game_v2.scene.getScene('MapScene') as MatchScene;
    this.createControls();
    this.createBar();
    this.createHead();
    this.input.keyboard.enabled = false;
  }

  createBar() {
    this.soundPower = this.sound.add('power-space');
    this.soundPower.setLoop(true);
    //
    const box = this.add.graphics();
    box.fillStyle(0x000000, 0.6);
    box.fillRoundedRect(sizeScene.width / 6 + 50, sizeScene.height - 150, 1280, 120, 10).setScrollFactor(0);
    // box.setAlpha(0.6);
    //ruler 
    const container = this.add.container(sizeScene.width / 5, sizeScene.height - 100).setScale((sizeScene.width - ((sizeScene.width / 5) * 2)) / sizeScene.width)
    container.setScrollFactor(0);
    const imgRuler = this.add.image(0, 0, 'controls', 'ruler.png').setOrigin(0);
    imgRuler.setScale(1.3);
    //power bar
    const barRemember = this.add.graphics();
    const sizeBar = imgRuler.width - 10;
    //box power bar
    const fill = this.add.nineslice(5, 55, 'controls', 'fill.png', 0, 0, 0, 0).setScale(1.3);
    fill.setOrigin(0, 0.5);
    container.add([barRemember, fill, imgRuler])
    const fragmentShader3 = ` precision mediump float; uniform float time; uniform vec2 resolution; uniform vec2 mouse; varying vec2 fragCoord; void main (void) { float intensity = 0.; for (float i = 0.; i < 54.; i++) { float angle = i/27. * 3.14159; vec2 xy = vec2(0.27 * cos(angle), 0.27 * sin(angle)); xy += fragCoord.xy/resolution.y-0.5; intensity += pow(1000000., (0.77 - length(xy) * 1.9) * (1. + 0.275 * fract(-i / 27. - time))) / 80000.; } gl_FragColor = vec4(clamp(intensity * vec3(0.0777, 0.196, 0.27), vec3(0.), vec3(1.)), 0.); } `;
    const tweens = this.tweens.add({
      targets: fill,
      width: sizeBar - 5,
      duration: 3500,
      ease: 'sine.inout',
      yoyo: true,
      repeat: -1,
    }).pause();
    this.btnPower = this.add.image(0, 0, 'controls', 'btnPower.png').setInteractive().setScale(0.5).setScrollFactor(0);
    const basesShader2 = new Phaser.Display.BaseShader('BufferShader2', fragmentShader3);

    const shader2 = this.add.shader(basesShader2, 400, 400, 256, 256).setScrollFactor(0).setVisible(false);
    this.tweens.add({
      targets: shader2,
      scaleX: 1,
      scaleY: 1,
      repeat: -1,
      yoyo: true,
      duration: 2000,
    });
    this.add.container(sizeScene.width * 0.93, sizeScene.height * 0.88, [shader2, this.btnPower]);


    this.MatchScene.players.map((player) => {
      player.events.on(PlayerEvent.IN_TURN, () => {
        if (player.isAbleToControl) {
          this.player = player;
          this.skill(player);
          this.enableTouch();
        }
      })
    });

    const keys = this.input.keyboard.addKeys('SPACE') as any;
    keys.SPACE.on('down', () => {
      shader2.setPosition(this.btnPower.x, this.btnPower.y);
      shader2.setVisible(true);
      tweens.restart();
      dataPixel = this.getMapPixel();
      this.soundPower.play();
    });
    keys.SPACE.on('up', () => {
      this.soundPower.stop();
      shader2.setVisible(false);
      tweens.pause();
      const total = tweens.data[0] as any
      const current = tweens.data[0] as any
      barRemember.clear();
      barRemember.setAlpha(0.8);
      barRemember.fillStyle(0x165583);
      barRemember.fillRect(5, fill.y - 27, (total.end * (current.current / total.end)) * 1.3, 51);
      this.player?.shot(100 * (current.current / total.end), dataPixel);
    })
    let dataPixel = []
    this.btnPower.on('pointerdown', () => {
      shader2.setPosition(this.btnPower.x, this.btnPower.y);
      shader2.setVisible(true);
      tweens.restart();
      dataPixel = this.getMapPixel();
      this.soundPower.play();
    });

    this.btnPower.on('pointerup', () => {
      this.soundPower.stop();
      shader2.setVisible(false);
      tweens.pause();
      const total = tweens.data[0] as any
      const current = tweens.data[0] as any
      barRemember.clear();
      barRemember.setAlpha(0.8);
      barRemember.fillStyle(0x165583);
      barRemember.fillRect(5, fill.y - 27, (total.end * (current.current / total.end)) * 1.3, 51);
      this.player?.shot(100 * (current.current / total.end), dataPixel);
    });
  }

  createControls() {
    this.btnLeft = this.add.image(- 90, 0, 'controls', 'btnDirectional.png').setAngle(-90).setScrollFactor(0).setInteractive();
    this.btnRight = this.add.image(90, 0, 'controls', 'btnDirectional.png').setAngle(90).setScrollFactor(0).setInteractive();
    this.btnUp = this.add.image(0, - 90, 'controls', 'btnDirectional.png').setScrollFactor(0).setInteractive();
    this.btnDown = this.add.image(0, 90, 'controls', 'btnDirectional.png').setScrollFactor(0).setAngle(180).setInteractive();

    // const background = this.add.circle(0, 0, 170, 0x000000).setAlpha(0.6);
    // const bg_0 = this.add.image(0, 0, 'controls', 'bg_0.png').setScale(1.1)
    // const bg_1 = this.add.image(0, 0, 'controls', 'bg_1.png').setScale(1.2)

    const container = this.add.container(sizeScene.width * 0.1, sizeScene.height * 0.83);
    container.add([this.btnRight, this.btnLeft, this.btnUp, this.btnDown])
    container.setScrollFactor(0);

    this.btnLeft.on('pointerdown', () => {
      this.btnLeft.setScale(0.9)
      this.player?.moveLeft()
    })
    this.btnLeft.on('pointerup', () => {
      this.btnLeft.setScale(1)
      this.player?.stopMove()
    })
    this.btnRight.on('pointerdown', () => {
      this.btnRight.setScale(0.9)
      this.player?.moveRight()
    })
    this.btnRight.on('pointerup', () => {
      this.btnRight.setScale(1)
      this.player?.stopMove()
    })
    this.btnUp.on('pointerdown', () => {
      this.btnUp.setScale(0.9)
      this.player?.increaseRulerAngle()
    })
    this.btnUp.on('pointerup', () => {
      this.btnUp.setScale(1)
    })
    this.btnDown.on('pointerdown', () => {
      this.btnDown.setScale(0.9)
      this.player?.decreaseRulerAngle()
    })
    this.btnDown.on('pointerup', () => {
      this.btnDown.setScale(1)
    })

    this.controlsKeyboard(this.btnUp, this.btnLeft, this.btnRight, this.btnDown);

  }

  async disableTouch() {
    this.btnUp.disableInteractive();
    this.btnLeft.disableInteractive();
    this.btnRight.disableInteractive();
    this.btnDown.disableInteractive();
    this.btnPower.disableInteractive();
  }

  async enableTouch() {
    this.btnUp.setInteractive();
    this.btnLeft.setInteractive();
    this.btnRight.setInteractive();
    this.btnDown.setInteractive();
    this.btnPower.setInteractive();
  }

  controlsKeyboard(btnUp, btnLeft, btnRight, btnDown) {
    const keys = this.input.keyboard.addKeys('W,S,A,D') as any;

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
    // const MatchScene = this as MatchScene;

    this.MatchScene.players
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
      this.MatchScene.platforms.children.entries.forEach((item: any) => {
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

  async createHead() {
    this.headLeft = this.add.image(50, 0, 'controls', 'bar-yourTeam.png').setOrigin(0);
    this.headRight = this.add.image(sizeScene.width - this.headLeft.width - 50, 0, 'controls', 'bar-enemyTeam.png').setOrigin(0);
    this.updateBar();
    this.MatchScene.players.map((item, index) => {
      if (item.schema.teamId === "A") {
        this.avatar(item, this.headLeft.width - (175 * (index + 1)))
      } else {
        this.avatar(item, (this.headRight.width + 110) + (175 * (index + 1)))
      }
    })
    const timeTurn = this.add.text(sizeScene.width / 2, 20, '', { align: 'center', fontSize: 50, fontFamily: 'Oswald' })
    const soundEndTurn = this.sound.add('end-turn');
    this.MatchScene.room.state.listen('turnTimeRemain', (value: number) => {
      if (value < 5) {
        if (value === 0) return
        timeTurn.setTint(0xff0000);
        timeTurn.setText(value.toString());
        soundEndTurn.play();
      } else {
        timeTurn.clearTint();
        timeTurn.setText(value.toString())
      }
      timeTurn.x = (sizeScene.width / 2) - (timeTurn.width / 2);
    });
  }

  avatar(item, x) {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 0.1);
    graphics.fillRoundedRect(x, 5, 100, 60, 0);

    const image = this.add.image(x + 10, 0, item.schema.id).setOrigin(0);

    image.mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
    image.setScale(0.3)
  }

  updateBar() {
    const width = 100
    this.MatchScene.players.map((item, index) => {
      if (item.schema.teamId === "A") {
        const bar = this.add.graphics().setDepth(1);
        bar.fillStyle(0xffffff)
        bar.fillRoundedRect(this.headLeft.width - (175 * (index + 1)), 70, width, 10, 0)
        // const percent = (item.hp * width) / item.schema.totalHp
        bar.fillStyle(0x41FF31)
        bar.fillRoundedRect(this.headLeft.width - (175 * (index + 1)), 70, (item.hp * width) / item.schema.totalHp, 10, 0);
      } else {
        const bar = this.add.graphics().setDepth(1);
        bar.fillStyle(0xffffff)
        bar.fillRoundedRect((this.headRight.width + 110) + (175 * (index + 1)), 70, width, 10, 0)
        // const player = this.add.image(200, 300, item.avatar)
        // const percent = (item.hp * width) / item.schema.totalHp
        bar.fillStyle(0xff0000)
        bar.fillRoundedRect((this.headRight.width + 110) + (175 * (index + 1)), 70, (item.hp * width) / item.schema.totalHp, 10, 0);
      }
    })
  }

  skill(player: Player) {
    //remove image skills
    const data = this.children.list
    data.filter(v => v.type === 'Image').
      filter((v: Phaser.GameObjects.Image) => v.texture.key === 'skills').map(i => {
        i.destroy();
      })
    this.skillHelp();
    //set skill
    let listSkill = []
    player.skills.map(async (i: MatchPlayerSkill) => {
      const imgSkill = new ButtonTweens({
        scene: this, x: sizeScene.width - 200, y: sizeScene.height - 200, texture: 'skills', frame: `${i.id.toLowerCase()}.png`, fn: async () => {
          await player.useSkill(i.id);
          imgSkill.setTint(0x808080);
          await data.filter(v => v.type === 'Image').
            filter((v: Phaser.GameObjects.Image) => v.texture.key === 'skills').map(i => {
              i.disableInteractive();
            })
        }
      }).disableInteractive();
      if (i.recoveryTime > 0) {
        imgSkill.setTint(0x808080)
      } else {
        imgSkill.clearTint();
        imgSkill.setInteractive();
      }
      listSkill.push(imgSkill);
    })

    Phaser.Actions.GridAlign(listSkill, {
      width: 1,
      height: 10,
      cellWidth: 111,
      cellHeight: 130,
      x: sizeScene.width - 150,
      y: sizeScene.height / 2.6
    });

    return listSkill
  }

  skillHelp() {
    let list = []
    for (var i = 0; i <= 2; i++) {
      list.push(this.add.image(0, 0, 'skills', 'lock.png'))
    }

    Phaser.Actions.GridAlign(list, {
      width: 3,
      height: 1,
      cellWidth: 85,
      cellHeight: 100,
      x: sizeScene.width / 1.38,
      y: sizeScene.height - 120
    });
  }

}