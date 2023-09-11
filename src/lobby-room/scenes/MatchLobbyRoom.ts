import MyPlayer from "lobby-room/characters/MyPlayer";
import OtherPlayer from "lobby-room/characters/OtherPlayer";
import { IPlayer, NavKeys } from "lobby-room/types/rooms";
import { Scene } from "phaser";
import '../characters/MyPlayer'
import '../characters/OtherPlayer'
import Phaser, { Math as pMath } from 'phaser'
import Network from "lobby-room/services/Network";
import { createCharacterAnims } from "lobby-room/characters/anims/CreateAnims";
import { isMobile } from "react-device-detect";
import { JoinChallenge } from "screens/game";
import { wait } from "game-play-v2/game-play/game-play.utils";

const { Vector2 } = pMath;
const MAX_PLAYER_SPEED = 200;
export class LobbyRoom extends Scene {
  network!: Network
  myPlayer!: MyPlayer
  map!: Phaser.Tilemaps.Tilemap
  cursors!: NavKeys
  joyStick!: any
  private otherPlayers!: Phaser.Physics.Arcade.Group
  private otherPlayerMap = new Map<string, OtherPlayer>()

  constructor() {
    super('LobbyRoom');
  }

  async create(data: { network: Network }) {
    if (!data.network) {
      throw new Error('server instance missing')
    } else {
      this.network = data.network
      await this.network.joinOrCreatePublic();
    }
    //build map tiles
    this.handleCreateMap();
    // register network event listeners
    this.HandleNetwork();
    //create animation
    createCharacterAnims(this.anims)

    this.myPlayer.setPlayerTexture('adam')
    //set name player
    await wait(200);
    this.myPlayer.setPlayerName(`Player #${Phaser.Math.Between(1, 100)}`);
    //create controls player with click
    // this.handleClickToMove();

    this.handlerJoyStick();

  }

  update() {
    if (this.myPlayer && this.network || this.joyStick) {
      this.myPlayer.update(this.network, this.cursors, this.joyStick)
    }
  }

  private handleCreateMap() {
    //control 
    this.cursors = {
      ...this.input.keyboard.createCursorKeys(),
    }
    if (isMobile) {
      this.handlerJoyStick();
    }
    //create title map
    this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 })
    const tileset = this.map.addTilesetImage('map-1', 'tiles', 32, 32)
    const layer = this.map.createLayer('Background', tileset, 0, 0)
    const build = this.map.createLayer('Building', tileset, 0, 0)
    layer.setCollisionByProperty({ collides: true })
    build.setCollisionByProperty({ collides: true })
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // const debug = this.add.graphics().setAlpha(0.5)
    // layer.renderDebug(debug, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })
    //add player
    this.myPlayer = this.add.myPlayer(800, 600, 'adam', this.network.mySessionId);
    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer })
    this.cameras.main.startFollow(this.myPlayer, true)
    //set collider
    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], [build, layer], () => {
      // let element = document.getElementById('lobby-contents')
      // if (element && element.style.display === 'none') {
      //   element.style.display = 'block';
      // }
      this.scene.remove();
      JoinChallenge()
    })
  }

  private handlerJoyStick() {
    const pluginsJoy = this.plugins.get('rexvirtualjoystickplugin') as any;
    this.joyStick = pluginsJoy.add(this, {
      x: 150,
      y: 500,
      radius: 100,
      base: this.add.circle(0, 0, 100, 0x888888).setAlpha(0.5),
      thumb: this.add.circle(0, 0, 50, 0xffffff).setAlpha(0.8),
    })
  }

  private handlePlayerJoined(newPlayer: IPlayer, id: string) {
    const otherPlayer = this.add.otherPlayer(newPlayer.x, newPlayer.y, 'adam', id, newPlayer.name)
    this.otherPlayers.add(otherPlayer)
    this.otherPlayerMap.set(id, otherPlayer)
  }

  private handleMyPlayerReady() {
    this.myPlayer.readyToConnect = true;
  }

  private HandleNetwork() {
    this.network.onPlayerJoined(this.handlePlayerJoined, this)
    this.network.onMyPlayerReady(this.handleMyPlayerReady, this)
    this.network.onPlayerLeft(this.handlePlayerLeft, this)
    this.network.onPlayerUpdated(this.handlePlayerUpdated, this)
    this.network.onChatMessageAdded(this.handleChatMessageAdded, this)
  }

  private handlePlayerLeft(id: string) {
    if (this.otherPlayerMap.has(id)) {
      const otherPlayer = this.otherPlayerMap.get(id)
      if (!otherPlayer) return
      this.otherPlayers.remove(otherPlayer, true, true)
      this.otherPlayerMap.delete(id)
    }
  }

  private handlePlayerUpdated(field: string, value: number | string, id: string) {
    const otherPlayer = this.otherPlayerMap.get(id)
    otherPlayer?.updateOtherPlayer(field, value)
  }

  private handleChatMessageAdded(playerId: string, content: string) {
    const otherPlayer = this.otherPlayerMap.get(playerId)
    otherPlayer?.updateDialogBubble(content)
  }
}


