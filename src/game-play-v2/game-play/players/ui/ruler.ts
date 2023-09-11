import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";
import { matchAssets } from "../../game-play.assets";
import { Player } from "../player.core";
import { PlayerEvent } from "../player.types";

export class PlayerRuler {
  id: string
  arrow: Phaser.GameObjects.Image
  ruler: Phaser.GameObjects.Image
  textAngle: Phaser.GameObjects.Text
  update: (angle?: number) => any

  constructor(player: Player) {
    const rulerSize = 280, arrowSize = 350;
    const scene = player.object.scene as MatchScene;

    this.id = `${player.schema.variant}_ruler`;

    const imageArrowKey = matchAssets.imgArrow.key;
    const imageRulerKey = matchAssets.imgRuler.key;
    const color = "#FFFFFF";

    this.ruler = scene.add.image(0, 0, imageRulerKey)
      .setDisplaySize(rulerSize, rulerSize)
      .setAlpha(0)

    this.arrow = scene.add.image(0, 0, imageArrowKey)
      .setDisplaySize(arrowSize, arrowSize)
      .setAlpha(0)

    this.textAngle = scene.add.text(0, 0, "0",
      {
        fontSize: '20px',
        fontStyle: "bolder",
        color,
      }
    )
      .setAlpha(0)

    this.update = (angle) => {
      if (typeof angle === 'number') {
        this.textAngle.setText(`${angle}°`);
        if (player.schema.isFlip) {
          if (angle < 0) {
            this.arrow.setAngle(angle + 180);
          } else {
            this.arrow.setAngle(angle - 180);
          }
        } else {
          this.arrow.setAngle(-angle);
        }
      } else {
        // Position
        this.arrow.x = player.object.x;
        this.arrow.y = player.object.y;
        this.ruler.x = player.object.x;
        this.ruler.y = player.object.y;
        this.textAngle.x = player.object.x - 20;
        this.textAngle.y = player.object.y - 110;

        // Flip related
        this.ruler.setFlipX(player.schema.isFlip);

        if (player.schema.isFlip && (this.arrow.angle >= -60 || (this.arrow.angle > 0 && this.arrow.angle <= 20))) {
          this.arrow.setAngle(180 - this.arrow.angle);
        }

        if (!player.schema.isFlip && (this.arrow.angle <= -120 || this.arrow.angle >= 160)) {
          this.arrow.setAngle(180 - this.arrow.angle);
        }
      }
    }

    this.update(player.schema.rulerAngle);
    player.events.on(PlayerEvent.CHANGE_POSITION, () => {
      this.update();
    })
  }

  show() {
    this.arrow.setAlpha(1);
    this.ruler.setAlpha(1);
    this.textAngle.setAlpha(1);
  }

  hide() {
    this.arrow.setAlpha(0);
    this.ruler.setAlpha(0);
    this.textAngle.setAlpha(0);
  }

  destroy() {
    this.ruler.destroy();
    this.textAngle.destroy();
    this.arrow.destroy();
  }
}