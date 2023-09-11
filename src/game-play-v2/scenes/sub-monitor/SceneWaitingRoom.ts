import { Room } from "colyseus.js"
import { ButtonTweens } from "game-play-v2/components/ButtonTweens";
import { GameEvent, LobbyEvent } from "game-play-v2/game-play/game-play.types";
import { wait } from "game-play-v2/game-play/game-play.utils";
import { sizeScene } from "game-play-v2/game-type"
import { GameContext } from "game-play-v2/services/game-context";
import { phaserEvents } from "lobby-room/types/rooms";
import { game_v2 } from "screens/game-v2";

export class SceneWaitingRoom extends Phaser.Scene {
  room: Room;
  network: GameContext;
  constructor() {
    super('SceneWaitingRoom')
  }

  init({room, network}) {
    this.room = room
    this.network = network
  }

  create() {
    this.add.image(0, 0, 'waiting-room', 'background.png').setOrigin(0);
    this.joinRooms();
    this.createRoom();
  }

  createRoom() {
    this.add.image(sizeScene.width - 808, 10, 'waiting-room', 'enamy.png').setOrigin(0);
    new ButtonTweens({
      scene: this,
      x: 10,
      y: 10,
      texture: 'waiting-room',
      frame: 'exit.png',
      fn: async () => {
        this.room.leave();
        this.scene.start('pvp');
      }
    }).setOrigin(0);
  }

  joinRooms() {
    if (!this.room.state.users) this.scene.restart();

    let users = []
    this.room.state.users?.forEach(user => users.push(user.toJSON()));
    let A = []
    let B = []

    users.filter(v => v.teamId === "A").forEach((i, index) => {
      const item = this.yourTeam();
      A.push(item);
    });

    users.filter(v => v.teamId === "B").forEach((i, index) => {
      const item = this.enemyTeam()
      B.push(item);
    });


    Phaser.Actions.GridAlign(A, {
      width: 3,
      height: 1,
      cellWidth: 260,
      cellHeight: 320,
      x: 20,
      y: sizeScene.height / 2.5,
      position: Phaser.Display.Align.TOP_CENTER
    });

    Phaser.Actions.GridAlign(B, {
      width: 3,
      height: 1,
      cellWidth: 260,
      cellHeight: 320,
      x: sizeScene.width / 2 + 150,
      y: sizeScene.height / 2.5,
      position: Phaser.Display.Align.TOP_CENTER
    })


    users.filter(v => !v.isHost).map((i) => {
      if (this.room.sessionId === i.id) {
        // const btnReady = this.add.image(sizeScene.width - 324, sizeScene.height - 155, 'waiting-room', 'btn_ready.png').setInteractive();
      }
    });

    users.filter(v => v.isHost).map((i) => {
      if (this.room.sessionId === i.id) {
        const btnPlay = this.add.image(sizeScene.width - 324, sizeScene.height - 155, 'waiting-room', 'btn_play.png').setInteractive();
        btnPlay.on('pointerdown', () => {
          this.tweens.add({
            targets: btnPlay,
            scale: 0.8,
            yoyo: true,
            duration: 100,
            onComplete: () => {
              this.network.startMatchRoom();
            }
          })
        });
      }
    });
  }

  enemyTeam() {
    const container = this.add.container(0, 0);
    const border = this.add.rectangle(0, 0, 247, 300);
    border.setStrokeStyle(5, 0xFF403F);
    const img = this.add.image(0, 0, 'waiting-room', 'robot.png');
    container.add([img, border]);
    return container
  }

  yourTeam() {
    const container = this.add.container(0, 0);
    const border = this.add.rectangle(0, 0, 247, 300);
    border.setStrokeStyle(5, 0x4BE3FF);
    const img = this.add.image(0, 0, 'waiting-room', 'robot.png');
    container.add([img, border]);
    return container
  }
}