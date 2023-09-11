import { sizeScene } from "game-play-v2/game-type"

export class SceneInfoUser extends Phaser.Scene {
  constructor() {
    super('SceneInfoUser')
  }
  create() {
  }

  infoWallet() {
    const boxGold = this.add.container(sizeScene.width / 2, 50);
    const boxMes = this.add.container(sizeScene.width / 1.5, 50);

    const icon_gold = this.add.image(0, 0, 'info-assets', 'gold.png');
    const text_gold = this.add.text(0, 0, '0.0000')
    const icon_mes = this.add.image(0, 0, 'info-assets', 'mes.png');

    boxGold.add([icon_gold, text_gold])
  }
}