import { Room } from "colyseus.js";
import { ButtonTweens } from "game-play-v2/components/ButtonTweens";
import { Emitter } from "game-play-v2/game-play/emitter";
import { LobbyEvent, MatchRoom } from "game-play-v2/game-play/game-play.types";
import { wait } from "game-play-v2/game-play/game-play.utils";
import { sizeScene } from "game-play-v2/game-type";
import { SceneWaitingRoom } from "game-play-v2/scenes/sub-monitor/SceneWaitingRoom";
import { GameContext } from "game-play-v2/services/game-context";
import { gameClient } from "index";
import { IOfficeState } from "lobby-room/types/rooms";
import { MapConfig, MapMode } from "modules/maps";
import { ModalBehavoir } from 'phaser3-rex-plugins/plugins/modal.js'
import { Container, Label, RoundRectangle, ScrollablePanel, Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { game_v2 } from "screens/game-v2";


export class pvp extends Phaser.Scene {
  themes: any;
  map: MapConfig[];
  mapIndex: MapConfig;
  network: GameContext;
  listRoom!: MatchRoom[];
  roomsLobby: Room<IOfficeState>;
  roomsWaiting: any;
  emitter: Emitter;

  constructor() {
    super('pvp')
  }

  init({ map, room }) {
    this.map = map
    this.roomsLobby = room
  }

  preload() {
    this.map.map((i, index) => {
      this.load.image(i.id, `/game-v2/game/pve/map_${index}.png`)
    })
  }

  create() {
    this.network = new GameContext(this);
    this.add.image(0, 0, 'arena', 'background.png').setOrigin(0);

    const btnBack = new ButtonTweens({
      scene: this, x: 0, y: 53, texture: "arena", frame: "btn_back.png", fn: () => {
        this.scene.stop('pvp');
        this.scene.stop('SceneWaitingRoom');
        this.scene.start('SceneLobby');
      }
    }).setOrigin(0);
    this.leftUI();
    this.rightUI();
    this.messageRooms();

    // this.emitter = new Emitter();

  }

  messageRooms() {
    this.roomsLobby.onMessage(LobbyEvent.CREATE_ROOM, () => {
      this.rightUI();
    });
  }

  async rightUI() {
    let allRooms;
    try {
      const map = await gameClient.getAvailableRooms()
      allRooms = map.filter(v => v.metadata?.mode === MapMode.DEMO_PVP)
    } catch (e) {
      console.log(e)
    }
    const label = this.add.image(sizeScene.width / 1.55, 200, 'arena', 'room_label.png')
    let panel = new ScrollablePanel(this, {
      x: sizeScene.width / 1.55, y: sizeScene.height / 1.8,
      height: sizeScene.height - sizeScene.height / 3,
      scrollMode: 0,
      panel: {
        child: this.getListRoom(allRooms, label),
      },
      space: { panel: 4 },
      mouseWheelScroller: {
        focus: false,
        speed: 0.1
      },
    }).layout();

    panel.setChildrenInteractive({
      click: true
    }).on('child.click', async (child) => {
      try {
        this.scene.start('SceneLoading');
        await wait(2000);
        const join = await this.network.joinMatchRoom(child.name);
        this.scene.start('SceneWaitingRoom', { room: join, network: this.network });
      } catch (e) {
        console.log(e)
      }
    })
    this.add.existing(panel);
  }

  getListRoom(allRooms, labels) {
    const panel = new Sizer(this, {
      width: labels.width - 3,
      orientation: 'y',
      space: { item: 4 }
    });
    for (var i = 0; i < allRooms.length; i++) {
      const graphics = this.add.graphics();
      graphics.fillGradientStyle(0x72FFFF, 0x72FFFF, 0x47C2FF, 0x47C2FF, 1);
      graphics.fillRect(0, -40, (labels.width / 8), 80);
      const label = new Label(this, {
        height: 85,
        text: new Container(this, 0, 0, [
          graphics.fillRect(0, -40, (labels.width / 8), 80),
          this.add.rectangle(labels.width / 2 + 85, 0, labels.width - (labels.width / 8), 80, 0x000000).setAlpha(0.6),
          this.add.text((labels.width / 8) / 2 - 20, -20, '123', { fontSize: 30, fontFamily: 'Oswald' }),
          this.add.text((labels.width / 8) + 20, -20, allRooms[i].metadata.hostName, { fontSize: 30, fontFamily: 'Oswald' }),
          this.add.text((labels.width / 2.5) + 20, -20, allRooms[i].metadata.mode, { fontSize: 30, fontFamily: 'Oswald' }),
        ]),
        space: { left: 0, right: 10, top: 20, bottom: 20 },
        name: allRooms[i].roomId
      })
      panel.add(label, { expand: true });
    }
    return panel;
  }

  leftUI() {
    // const bg = this.add.image(0, 0, 'arena', 'bg_room.png').setOrigin(0);
    const allText = this.add.text(-200, -20, 'All', { fontSize: 30 });
    allText.setFontFamily('Oswald');
    const soloText = this.add.text(-200, -20, 'Solo', { fontSize: 30 });
    soloText.setFontFamily('Oswald');
    const doublesText = this.add.text(-200, -20, 'Doubles', { fontSize: 30 });
    doublesText.setFontFamily('Oswald');
    const triplesText = this.add.text(-200, -20, 'Triples', { fontSize: 30 });
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

    const btnCreate = new ButtonTweens({ scene: this, x: 300, y: sizeScene.height - 200, texture: "arena", frame: "btn_create.png", fn: () => this.modalMap() });
  }

  setTints(ob, array: Phaser.GameObjects.Text[]) {
    array.filter(v => v !== ob).map((item: Phaser.GameObjects.Text) => {
      item.setTint(0xFFFFFF);
    })
    ob.setTint(0xFFF84B);
  }

  modalMap() {
    const container = this.add.container(sizeScene.width / 2, sizeScene.height / 2)
    const box = this.add.rectangle(0, 0, sizeScene.width - 100, sizeScene.height / 1.5, 0x000000);
    const btn_close = new ButtonTweens({ scene: this, x: -150, y: 230, texture: "arena", frame: "btn_close.png", fn: () => modal.requestClose() });
    const btn_confirm = new ButtonTweens({
      scene: this, x: 150, y: 230, texture: "arena", frame: "btn_confirm.png", fn: async () => {
        try {
          this.roomsWaiting = await this.network.createMatchRoom({
            mapId: this.mapIndex.id,
            loadBackground: this.mapIndex.assetUrl + '/background.png',
            params: {
              roomName: this.mapIndex.name
            },
          });
          await this.roomsLobby.send(LobbyEvent.CREATE_ROOM);
          container.destroy();
          this.scene.start('SceneLoading')
          await wait(2000);
          this.scene.start('SceneWaitingRoom', { room: this.roomsWaiting, network: this.network });
        } catch (e) {
          console.log(e)
        }

      }
    });

    const border = this.add.rectangle(0, 0, 515, 335);
    border.setStrokeStyle(5, 0x4BE3FF);

    const text_map1 = this.add.container(-550, -170, [this.add.rectangle(0, 240, 510, 90, 0x000000).setAlpha(0.7), this.add.text(-30, 220, this.map[0].name, { fontSize: 30, fontFamily: 'Oswald', align: 'center' })])

    const text_map2 = this.add.container(0, -170, [this.add.rectangle(0, 240, 510, 90, 0x000000).setAlpha(0.7), this.add.text(-40, 220, this.map[1].name, { fontSize: 30, fontFamily: 'Oswald', align: 'center' })])

    const text_map3 = this.add.container(550, -170, [this.add.rectangle(0, 240, 510, 90, 0x000000).setAlpha(0.7), this.add.text(-30, 220, this.map[2].name, { fontSize: 30, fontFamily: 'Oswald', align: 'center' })])

    const map1 = this.add.image(-550, -50, `DemoPVP1Vs1`).setInteractive();
    map1.on('pointerdown', () => {
      border.x = map1.x - 2
      border.y = map1.y - 2.5
      this.mapIndex = this.map[0]
    })
    const map2 = this.add.image(0, -50, `DemoPVP2Vs2`).setInteractive();
    map2.on('pointerdown', () => {
      border.x = map2.x - 2
      border.y = map2.y - 2.5
      this.mapIndex = this.map[1]
    })
    const map3 = this.add.image(550, -50, `DemoPVP3Vs3`).setInteractive();
    map3.on('pointerdown', () => {
      border.x = map3.x - 2
      border.y = map3.y - 2.5
      this.mapIndex = this.map[2]
    })

    this.mapIndex = this.map[0];
    border.x = map1.x - 2
    border.y = map1.y - 2.5

    container.add([box, btn_confirm, btn_close, map1, map2, map3, border, text_map1, text_map2, text_map3]);

    const scene = this as any
    var modal = new ModalBehavoir(container, {
      duration: {
        in: 100,
        out: 100
      },
    })
  }
}