import { ButtonTweens } from 'game-play-v2/components/ButtonTweens';
import { sizeScene } from 'game-play-v2/game-type';
import { ModalBehavoir } from 'phaser3-rex-plugins/plugins/modal.js';
import { ModalPromise, ScrollablePanel, FixWidthSizer, Container, ImageBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

const data = [
  {
    name: 'Sauer pistol I',
    url: 'https://mesea.io/collections/56/weaponofgunpun'
  },
  {
    name: 'Sauer pistol II',
    url: 'https://mesea.io/collections/56/weaponofgunpun'
  },
  {
    name: 'Sauer pistol III',
    url: 'https://mesea.io/collections/56/weaponofgunpun'
  },
  {
    name: 'Sauer pistol I',
    url: 'https://mesea.io/collections/56/weaponofgunpun'
  },
  {
    name: 'Sauer pistol II',
    url: 'https://mesea.io/collections/56/weaponofgunpun'
  },
  {
    name: 'Sauer pistol III',
    url: 'https://mesea.io/collections/56/weaponofgunpun'
  },
  {
    name: 'Armor I',
    url: 'https://mesea.io/collections/56/armorofgunpun'
  },
  {
    name: 'Armor I',
    url: 'https://mesea.io/collections/56/armorofgunpun'
  },
  {
    name: 'Armor II',
    url: 'https://mesea.io/collections/56/armorofgunpun'
  },
  {
    name: 'Armor II',
    url: 'https://mesea.io/collections/56/armorofgunpun'
  },
]

export class SceneStore extends Phaser.Scene {
  constructor() {
    super('SceneStore')
  }

  create() {
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


    this.add.image(0, 0, 'item_store', 'background.png').setOrigin(0);
    new ButtonTweens({
      scene: this, x: 0, y: 50, texture: 'item_store', frame: 'btn_back.png', fn: () => {
        this.scene.start('SceneLobby')
      }
    }).setOrigin(0);

    const box = this.add.rectangle(sizeScene.width / 1.6, sizeScene.height / 2.1, sizeScene.width / 1.5, sizeScene.height / 1.5, 0x000000, 0.4);
    box.setStrokeStyle(1, 0xefc53f);

    this.leftUI();

    let panel = new ScrollablePanel(this, {
      x: sizeScene.width / 1.6,
      y: sizeScene.height / 2.1,
      width: sizeScene.width / 1.5,
      height: sizeScene.height / 1.5,
      scrollMode: 0,
      panel: {
        child: this.createItems(),
        mask: {
          padding: 1,
        }
      },
      mouseWheelScroller: {
        focus: false,
        speed: 0.1
      },
      space: { left: 10, right: 10, top: 10, bottom: 10, panel: 10, header: 10, footer: 10, }
    }).layout();

    panel.setChildrenInteractive({
      click: true
    }).on('child.click', async (child) => {
      this.createModal(child)
    })
  }

  leftUI() {
    // const bg = this.add.image(0, 0, 'arena', 'bg_room.png').setOrigin(0);
    const allText = this.add.text(-20, -20, 'All', { fontSize: 30 });
    allText.setFontFamily('Oswald');
    const soloText = this.add.text(-20, -20, '', { fontSize: 30 });
    soloText.setFontFamily('Oswald');
    const doublesText = this.add.text(-20, -20, '', { fontSize: 30 });
    doublesText.setFontFamily('Oswald');
    const triplesText = this.add.text(-20, -20, '', { fontSize: 30 });
    triplesText.setFontFamily('Oswald');

    const groupText = [allText, soloText, doublesText, triplesText];

    const all = this.add.container(300, 200, [this.add.image(0, 0, 'arena', 'bg_room.png'), allText]).setInteractive(new Phaser.Geom.Rectangle(-200, -50, 400, 100), Phaser.Geom.Rectangle.Contains)
    all.on('pointerdown', () => {
      this.setTints(allText, groupText);
    });
    const solo = this.add.container(300, 300, [this.add.image(0, 0, 'arena', 'bg_room.png'), soloText]).setInteractive(new Phaser.Geom.Rectangle(-200, -50, 400, 100), Phaser.Geom.Rectangle.Contains)
    solo.on('pointerdown', () => {
      this.setTints(soloText, groupText);
    });
    const doubles = this.add.container(300, 400, [this.add.image(0, 0, 'arena', 'bg_room.png'), doublesText]).setInteractive(new Phaser.Geom.Rectangle(-200, -50, 400, 100), Phaser.Geom.Rectangle.Contains)
    doubles.on('pointerdown', () => {
      this.setTints(doublesText, groupText);
    });
    const triples = this.add.container(300, 500, [this.add.image(0, 0, 'arena', 'bg_room.png'), triplesText]).setInteractive(new Phaser.Geom.Rectangle(-200, -50, 400, 100), Phaser.Geom.Rectangle.Contains)
    triples.on('pointerdown', () => {
      this.setTints(triplesText, groupText);
    });
  }

  setTints(ob, array: Phaser.GameObjects.Text[]) {
    array.filter(v => v !== ob).map((item: Phaser.GameObjects.Text) => {
      item.setTint(0xFFFFFF);
    })
    ob.setTint(0xFFF84B);
  }

  createModal(texture) {
    const container = this.add.container(sizeScene.width / 2, sizeScene.height / 2)
    const r2 = this.add.rectangle(0, 0, sizeScene.width / 4, sizeScene.height / 2, 0x000000).setAlpha(.7);

    r2.setStrokeStyle(2, 0x126C7C);
    // const box_item = this.add.image(0, -120, 'updrade', 'box.png');
    const img = this.add.image(0, -120, 'items', texture.children[1].frame.name).setScale(1.5);
    this.tweens.add({
      targets: img,
      y: { from: img.y, to: img.y + 10 },
      yoyo: true,
      repeat: -1,
      duration: 500,
    })
    const thunder = this.add.sprite(0, -120, 'thunder').play('thunder').setScale(1.5).setRotation(1);
    const btn_Buy = new ButtonTweens({
      scene: this, x: 0, y: 190, texture: 'updrade', frame: 'btn_buy.png', fn: () => {
        modal.requestClose();
        const url = texture.children[0].name;
        const s = window.open(url, '_blank');
        if (s && s.focus) {
          s.focus();
        }
        else if (!s) {
          window.location.href = url;
        }
      }
    });
    const btn_Close = new ButtonTweens({
      scene: this, x: 200, y: -230, texture: 'item_store', frame: 'btn_close.png', fn: () => {
        modal.requestClose();
      }
    });

    const name = this.add.text(0, 30, texture.children[1].name, { align: "center", fontSize: 30, fontFamily: 'Oswald' })
    name.x = - name.width / 2
    container.add([r2, img, thunder, name, btn_Buy, btn_Close]);

    var modal = new ModalBehavoir(container, {
      duration: {
        in: 100,
        out: 100
      },
    });
  }

  createItems() {
    // Create table body
    var sizer = new FixWidthSizer(this, {
      space: { left: 10, right: 10, top: 10, bottom: 10, item: 10, },
    })

    data.map((i, index) => {
      sizer.add(new Container(this, 0, 0, 230, 230, [
        this.add.image(0, 0, 'updrade', 'box.png').setName(i.url),
        this.add.image(0, 0, 'items', `${index + 1}.png`).setName(i.name),
      ])
      )
    })

    return sizer;
  }
}