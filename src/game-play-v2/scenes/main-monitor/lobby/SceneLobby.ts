import { LobbyEvent } from "game-play-v2/game-play/game-play.types";
import { sizeScene } from "game-play-v2/game-type";
import Network from "lobby-room/services/Network";
import { MapConfig, MapMode } from "modules/maps";
import { ButtonTweens } from "game-play-v2/components/ButtonTweens";
import { ModalBehavoir } from 'phaser3-rex-plugins/plugins/modal.js';


export class SceneLobby extends Phaser.Scene {
  lobbyRoom: any;
  mapPvP: MapConfig[];
  mapPvE: MapConfig[];
  account: any;

  constructor() {
    super('SceneLobby')
  }


  init({ social }) {
    this.account = social
  }

  preload() {
    this.load.image('avatar', this.account.information.avatar)
  }
  async create(data) {
    await this.createRoom();
    this.input.setDefaultCursor('url(/game-v2/SC2-cursor-protoss.cur), pointer');
    await this.buildLobby();
    await this.infoWallet(this, data);
  }

  async createRoom() {
    this.soundLobbyRoom();
    if (this.lobbyRoom) return
    try {
      const network = new Network();
      this.lobbyRoom = await network.joinOrCreatePublic();
      this.messageRooms();
    } catch (e) {
      this.add.text(sizeScene.width / 2, sizeScene.height / 2, 'Error Server', { fontSize: 40, fontFamily: 'Oswald' });
      this.scene.restart();
      return
    }
  }

  async getMapPve() {
    this.scene.start('pve', this.mapPvE);
  }

  async getMapPvP() {
    this.scene.start('pvp', { map: this.mapPvP, room: this.lobbyRoom });
  }

  messageRooms() {
    this.lobbyRoom.onMessage(LobbyEvent.MAP_GAME, ({ data }) => {
      this.mapPvP = data.filter(v => v.mode === MapMode.DEMO_PVP);
      this.mapPvE = data.filter(v => v.mode === MapMode.DEMO_PVE);
    });
  }

  buildLobby() {
    this.add.image(0, 0, 'lobby', 'background.png').setOrigin(0);
    const ranking = new ButtonTweens({
      scene: this, x: sizeScene.width / 6, y: sizeScene.height / 2.5, texture: 'lobby', frame: 'ranking.png', fn: () => {
      }
    });
    const arena = new ButtonTweens({
      scene: this, x: sizeScene.width / 2, y: sizeScene.height / 3.3, texture: 'lobby', frame: 'arena.png', fn: async () => {
        this.getMapPvP();
      }
    });
    const shop = new ButtonTweens({
      scene: this, x: sizeScene.width - 281.5, y: sizeScene.height / 2.4, texture: 'lobby', frame: 'shop.png', fn: () => {
        this.scene.start('SceneStore')
      }
    });
    const training = this.add.container(sizeScene.width - 130, sizeScene.height - (sizeScene.height / 8))
    const training_bg = this.add.image(0, 0, 'lobby', 'training_bg.png')
    const training_icon = new ButtonTweens({
      scene: this, x: -20, y: -40, texture: 'lobby', frame: 'training_icon.png', fn: () => {
        this.getMapPve();
      }
    });
    training.add([training_bg, training_icon]);

    const inventory = this.add.container(sizeScene.width - 350, sizeScene.height - (sizeScene.height / 8))
    const inventory_bg = this.add.image(0, 0, 'lobby', 'inventory_bg.png')
    const inventory_icon = new ButtonTweens({
      scene: this, x: -20, y: -20, texture: 'lobby', frame: 'inventory_icon.png', fn: () => {
        // this.tweensClick(inventory_icon);
      }
    });
    inventory.add([inventory_bg, inventory_icon]);

    const mission = this.add.container(sizeScene.width - 550, sizeScene.height - (sizeScene.height / 8))
    const mission_bg = this.add.image(0, 0, 'lobby', 'mission_bg.png')
    const mission_icon = new ButtonTweens({
      scene: this, x: -20, y: -20, texture: 'lobby', frame: 'mission_icon.png', fn: () => {
        // this.tweensClick(mission_icon);
      }
    });
    mission.add([mission_bg, mission_icon]);

    const upgrade = this.add.container(sizeScene.width - 750, sizeScene.height - (sizeScene.height / 8))
    const upgrade_bg = this.add.image(0, 5, 'updrade', 'box_1.png')
    const upgrade_icon = new ButtonTweens({
      scene: this, x: -10, y: -20, texture: 'updrade', frame: 'icon.png', fn: () => {
        this.scene.start('SceneUpgrade');
      }
    });
    upgrade.add([upgrade_bg, upgrade_icon]);
  }

  soundLobbyRoom() {
    this.sound.stopAll();
    const sound = this.sound.add('background')
    sound.setLoop(true);
    sound.play();
  }

  infoWallet(scene, data) {
    const boxGold = this.add.container(sizeScene.width / 1.7, 50);
    const boxMes = this.add.container(sizeScene.width / 1.3, 50);

    const icon_gold = this.add.image(-120, 0, 'info-assets', 'gold.png');
    const text_gold = this.add.text(-60, -15, '0.0000', { fontSize: 25, fontFamily: 'Oswald', align: 'center' });
    const plus_gold = new ButtonTweens({
      scene: this,
      x: 100, y: 0, texture: 'info-assets', frame: 'plus.png', fn: () => {

      }
    });
    const box_gold = this.add.rectangle(0, 0, 260, 60, 0x000843, 0.7)

    const icon_mes = this.add.image(-120, 0, 'info-assets', 'mes.png');
    const text_mes = this.add.text(-60, -15, '0.00 MES', { fontSize: 25, fontFamily: 'Oswald', align: 'center' });
    const box_mes = this.add.rectangle(0, 0, 260, 60, 0x000843, 0.7)
    const plus_mes = new ButtonTweens({
      scene: this,
      x: 100, y: 0, texture: 'info-assets', frame: 'plus.png', fn: () => {

      }
    });

    boxGold.add([box_gold, icon_gold, text_gold, plus_gold])
    boxMes.add([box_mes, icon_mes, text_mes, plus_mes])

    const btnSetting = new ButtonTweens({
      scene: this, x: sizeScene.width - 50, y: 50, texture: 'info-assets', frame: 'setting.png', fn: () => {
        this.modalSetting(data)
      }
    })
  }

  modalSetting(data) {

    const container = this.add.container(sizeScene.width / 2, sizeScene.height / 2)
    const box = this.add.rectangle(0, 0, 500, 200, 0x000000, 0.5);
    const btnContainer = this.add.container(0, 0)
    const btn = this.add.rectangle(0, 50, 150, 50, 0xFF7D72).setInteractive();
    const text_btn = this.add.text(-40, 35, 'LogOut', { fontSize: 25, fontFamily: 'Oswald', align: 'center' })
    btnContainer.add([btn, text_btn])

    btn.on('pointerdown', async () => {
      await data.social.handleLogout();
      // console.log(data)
    })

    const btn_Close = new ButtonTweens({
      scene: this, x: 210, y: -60, texture: 'item_store', frame: 'btn_close.png', fn: () => {
        modal.requestClose();
      }
    });

    container.add([box, btnContainer, btn_Close])


    const modal = new ModalBehavoir(container, {
      duration: {
        in: 100, out: 100
      }
    })
  }
}