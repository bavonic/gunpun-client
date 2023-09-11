import { sizeScene } from "./game-type";

class sceneInfo extends Phaser.Scene {
  constructor() {
    super({ key: "sceneInfo" });
  }
  text?: Phaser.GameObjects.Text;
  lastUpdate?: number;

  create() {
    this.text = this.add.text(100, 100, '').setInteractive();
    this.text.setAlpha(0.7);
    this.lastUpdate = 0;
    this.text.setFontFamily('Oswald');
    this.text.setFontSize(40);
  }


  update(time: number, _: number): void {
    if (time > this.lastUpdate! + 100) {
      this.text!.setText([
        "GunPun!",
        "FPS: " + Math.round(this.game.loop.actualFps)
      ]);
      this.lastUpdate = time;
    }
  }
}

export class getInfoGame {
  constructor(scene: Phaser.Scene) {
    scene.scene.remove('sceneInfo')
    scene.scene.add('sceneInfo', sceneInfo)
    scene.scene.run('sceneInfo')
  }
}