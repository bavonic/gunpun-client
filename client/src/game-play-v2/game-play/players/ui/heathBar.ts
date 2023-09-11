import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";
import { matchAssets } from "../../game-play.assets";
import { Player } from "../player.core";
import { PlayerEvent } from "../player.types";

export class PlayerHealthBar {
  barSprite!: Phaser.GameObjects.Graphics;
  container!: Phaser.GameObjects.Container;
  show: () => void;
  hide: () => void;
  update: () => any;

  constructor(player: Player) {
    const width = 120;
    const height = 10;
    const strokeWidth = 0;

    this.barSprite = player.object.scene.add.graphics()
      .setDepth(1)
      .setVisible(false)

    player.object.scene.add.existing(this.barSprite);

    // Background
    this.barSprite.fillStyle(0x000000)
    this.barSprite.fillRoundedRect(0, 0, width + strokeWidth * 2, height / 2, 0);

    // const rulerHeath = player.scene.add.image(0, 0, matchAssets.rulerHeath.key);
    // rulerHeath.setVisible(false);
    // rulerHeath.setDisplaySize(width + 5, height);
    this.container = player.scene.add.container(strokeWidth, strokeWidth, [this.barSprite]);

    let isEnemy = false;

    if (player.scene instanceof MatchScene) {
      const myTeam = player.scene.getMyTeam();
      isEnemy = myTeam && player.schema.teamId !== myTeam;
    }

    this.update = () => {
      const percentRemain = (player.hp / player.schema.totalHp) * 100

      // Health
      this.barSprite.fillStyle(0xffffff)
      this.barSprite.fillRoundedRect(strokeWidth, strokeWidth, width, (height - strokeWidth * 2) , 0)

      if (percentRemain < 30 || isEnemy) {
        this.barSprite.fillStyle(0xfc6351)
      } else if (percentRemain < 60) {
        this.barSprite.fillStyle(0xe67e22)
      } else {
        this.barSprite.fillStyle(0x88e049)
      }

      this.barSprite.fillRoundedRect(strokeWidth, strokeWidth, (player.hp * width) / player.schema.totalHp, height - strokeWidth * 2, 0)
    }

    this.show = () => {
      this.update();
      this.barSprite.setVisible(true);
      // rulerHeath.setVisible(true);
    }

    this.hide = () => {
      this.barSprite.setVisible(false);
      // rulerHeath.setVisible(false);
    }

    player.events.on(PlayerEvent.CHANGE_POSITION, () => {
      // Position
      // rulerHeath.setPosition(62, 10);
      this.container.setPosition(player.object.x - width / 2, player.object.y + player.object.body.height / 2 + 15);
    })

    player.events.on(PlayerEvent.UPDATE_HP, () => {
      this.update();
    })

    this.show();
  }

  destroy() {
    if (this.container) this.container.destroy();
    if (this.barSprite) this.barSprite.destroy();
  }
}