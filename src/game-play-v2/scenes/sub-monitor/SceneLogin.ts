import { sizeScene, socialAuth } from "game-play-v2/game-type";
import { UserProvider } from "modules/user";
import { SceneLobby } from "../main-monitor/lobby/SceneLobby";

import { RequestMainModule } from "modules/request";

export class SceneLogin extends Phaser.Scene {
  keyCharacter: string;
  btnChoose: any;
  imgUrl: string;
  account: any;
  constructor() {
    super("SceneLogin")
  }

  init({ social }) {
    this.account = social
  }

  create(data) {
    if (!data.social.isConnected) {
      this.Login(data);
    } else {
      if (!data.social.isHaveCharacters) {
        this.createCharacter();
      }
      else {
        this.scene.add('SceneLobby', SceneLobby);
        this.scene.start('SceneLobby', data);
      }
    }
  }

  async createCharacter() {
    this.add.image(0, 0, 'character-assets', 'background.png').setOrigin(0);
    const group = this.add.container(sizeScene.width - (sizeScene.width / 3.5), sizeScene.height / 1.3)
    const r1 = this.add.circle(0, 0, 150, 0x000000).setAlpha(0.3);
    r1.scaleX = 2
    r1.scaleY = 0.3
    const btnSave = this.add.image(0, 160, 'character-assets', 'btn-save.png').setInteractive();
    // const btnSetting = this.add.image(sizeScene.width - 50, 30, 'character-assets', 'btn-setting.png');
    const btnBack = this.add.image(50, 30, 'character-assets', 'btn-back.png').setOrigin(0);
    // button next character
    const next_right = this.add.image(group.x + sizeScene.width / 5, group.y - 250, 'character-assets', 'btn-next.png').setFlipX(true).setInteractive();
    const next_left = this.add.image(group.x - sizeScene.width / 5, group.y - 250, 'character-assets', 'btn-next.png').setInteractive();
    //carousel 
    const image_carousel = this.Carousel(sizeScene.width / 4, sizeScene.height / 2, 200);
    const sprites_carousel = this.Carousel(sizeScene.width - (sizeScene.width / 3.8), sizeScene.height / 2, 60);
    //
    const images = image_carousel.ob.points.map((i, index) => {
      // if (index === 0) {
      // const img = this.add.image(i.x, i.y, 'character-assets', `card_${index}.png`);
      // img.setScale(0.5 + image_carousel.ob.scale * (i.y - image_carousel.ob.minY))
      // img.setDepth(i.y)
      this.btnChoose = this.add.image(sizeScene.width / 4, i.y + 300, 'character-assets', 'btn-choose.png').setInteractive();
      this.btnChoose.setAlpha(0);
      //   return img
      // }
      const img = this.add.image(i.x, i.y, 'character-assets', `card_${index}.png`);
      img.setScale(0.5 + image_carousel.ob.scale * (i.y - image_carousel.ob.minY))
      img.setDepth(i.y)
      return img
    })
    const characters = sprites_carousel.ob.points.map((i, index) => {
      const sprite = this.add.sprite(i.x, i.y, 'character-assets', `character_${index}.png`);
      sprite.setAlpha(sprites_carousel.ob.alpha * (i.y - sprites_carousel.ob.minY))
      sprite.setDepth(i.y)
      return sprite
    })
    const element = this.add.dom(0, 70).createFromCache('nameform');
    // element.setPerspective(800);

    group.add([r1, btnSave, element]);

    this.InputImage();

    next_left.on('pointerdown', async () => {
      this.NextCharacter(sprites_carousel.ob.points, characters, sprites_carousel.ob.alpha, sprites_carousel.ob.minY);
      this.NextImage(image_carousel.ob.points, images, image_carousel.ob.scale, image_carousel.ob.minY, image_carousel.ob.alpha, this.btnChoose);
      await Phaser.Utils.Array.RotateLeft(image_carousel.ob.points);
      await Phaser.Utils.Array.RotateLeft(sprites_carousel.ob.points);
    })
    next_right.on('pointerdown', async () => {
      await Phaser.Utils.Array.RotateRight(image_carousel.ob.points);
      await Phaser.Utils.Array.RotateRight(sprites_carousel.ob.points);
      this.NextCharacter(sprites_carousel.ob.points, characters, sprites_carousel.ob.alpha, sprites_carousel.ob.minY);
      this.NextImage(image_carousel.ob.points, images, image_carousel.ob.scale, image_carousel.ob.minY, image_carousel.ob.alpha, this.btnChoose);
    })
    btnSave.on('pointerdown', async () => {
      let name = element.getChildByName("username") as any;
      this.tweens.add({
        targets: this,
        scale: 0.9,
        yoyo: true,
        duration: 100,
        onComplete: i => {
          i.destroy();
        },
        onActive: async () => {
          if (name.value != "" && this.imgUrl) {
            await this.account.handleUpdate({ nickname: name.value, avatar: this.imgUrl });
          }
        }
      })

    })
  }

  Carousel(x, y, yRadius) {
    const ellipse = new Phaser.Curves.Ellipse({
      x: x,
      y: y,
      xRadius: 1,
      yRadius: yRadius,
      rotation: 90,
    }) as any;

    const totalItem = 3;
    const points = ellipse.getPoints(totalItem);
    points.pop();

    let minY = points.reduce((prev, current) => (current.y <= prev) ? current.y : prev, points[0].y);
    let maxY = points.reduce((prev, current) => (current.y >= prev) ? current.y : prev, points[0].y);
    const alpha = 1 / (maxY - minY)
    const scale = 0.4 / (maxY - minY)

    return {
      ob: {
        points,
        scale,
        alpha,
        minY
      }
    }
  }

  NextImage(points, images, scale, minY, alpha?, button?) {
    points.forEach((i, index) => {
      const finalPoint = (index === points.length - 1);
      const img = images[index];
      const point = (finalPoint) ? points[0] : points[index + 1]
      const x = point.x
      const y = point.y

      this.add.tween({
        targets: img,
        x,
        y,
        ease: 'power1',
        duration: 300,
        onComplete: ((tw) => tw.destroy()),
        onUpdate: (tw, targets) => {
          img.setScale(0.5 + scale * (targets.y - minY))
          img.setDepth(targets.y)
          if (index === 2) {
            button.setAlpha(alpha * (targets.y - minY))
          }
        }
      })
    });
  }

  NextCharacter(points, sprites, alpha, minY) {
    points.forEach((i, index) => {
      const finalPoint = (index === points.length - 1);
      const sprite = sprites[index];
      const point = (finalPoint) ? points[0] : points[index + 1]
      const x = point.x
      const y = point.y

      const name = (sizeScene.width - (sizeScene.width / 3.8) === x);

      this.add.tween({
        targets: sprite,
        x,
        y,
        ease: 'power1',
        duration: 300,
        onComplete: ((tw, targets) => {
          tw.destroy();
          if (name) {
            this.keyCharacter = sprite.frame.name
          }
        }),
        onUpdate: (tw, targets) => {
          // sprite.setScale(0.5 + scale * (targets.y - minY))
          sprite.setAlpha(alpha * (targets.y - minY))
          sprite.setDepth(targets.y)
          // console.log(alpha * (targets.y - minY))
        }
      })
    });
  }

  InputImage() {
    if (!this.btnChoose) return
    // Create canvas
    const scene = this as any
    var canvas = scene.add.rexCanvas(400, 300, 300, 300);
    canvas.fitTo = (function (parent) {
      var newSize = this.FitTo(this, parent, true);
      this.setDisplaySize(newSize.width, newSize.height);
    }).bind(canvas)
    // Create a transparent file chooser
    scene.add.rexFileChooser({
      accept: 'image/*'
    })
      .syncTo(this.btnChoose)
      .on('change', async (gameObject) => {
        var files = gameObject.files;
        if (files.length === 0) {
          return;
        }

        var url = URL.createObjectURL(files[0]);
        this.imgUrl = await RequestMainModule.uploadMedia(files[0], 300);
        // canvas.loadFromURLPromise(url)
        //   .then(function () {
        //     URL.revokeObjectURL(url);
        //     canvas.fitTo(this.btnChoose);
        //   })
      })
  }

  FitTo = function (child, parent, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      // out = globalSize;
    }

    if ((child.width <= parent.width) && (child.height <= parent.height)) {
      out.width = child.width;
      out.height = child.height;
      return out;
    }

    var childRatio = child.width / child.height;
    out.width = Math.min(child.width, parent.width);
    out.height = Math.min(child.height, parent.height);
    var ratio = out.width / out.height;

    if (ratio < childRatio) {
      out.height = out.width / childRatio;
    } else if (ratio > childRatio) {
      out.width = out.height * childRatio;
    }

    return out;
  }

  async Login(data) {
    this.add.image(0, 0, 'login-assets', 'background.png').setAlpha(0.5).setOrigin(0);
    this.add.image(sizeScene.width / 2, sizeScene.height / 5.5, 'login-assets', 'login_logo.png')

    const container = this.add.container(sizeScene.width / 2, (sizeScene.height / 2.3) - 10);
    const box = this.add.rectangle(0, 230, 680, 380, 0x000000);
    box.setAlpha(0.2);
    socialAuth.map((i, index) => {
      const btn = this.add.image(0, 150 * (index + 1), 'login-assets', `${i}.png`)
      btn.setInteractive();
      btn.on('pointerdown', async () => {
        // switch (i) {
        //   case 'facebook': {
        //     data.social.handleSignInSocial(UserProvider.FACEBOOK)
        //       .catch(err => console.log(err))
        //     break
        //   }
        //   case 'google': {
        //     data.social.handleSignInSocial(UserProvider.GOOGLE)
        //       .catch(err => console.log(err))
        //     break
        //   }
        // }
        // await data.wallet(i).catch(er => console.log(er))
        data.social.handleSignInSocial(UserProvider.GOOGLE)
          .catch(err => console.log(err))
        this.add.tween({
          targets: btn,
          scale: 0.9,
          yoyo: true,
          duration: 100,
          onComplete: (i) => {
            i.destroy()
          }
        });
      })
      container.add([box, btn])
    })

  }
}

