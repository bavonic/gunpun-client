import { sizeScene } from "game-play-v2/game-type";
import { game_v2 } from "screens/game-v2";

export class SceneLoading extends Phaser.Scene {
  tweensLoading: any
  constructor() {
    super('SceneLoading');
  }
  create() {
    this.sound.stopAll();
    
    this.add.image(0, 0, 'login-assets', 'background.png').setOrigin(0).setAlpha(0.9);
    const loading = this.add.container(sizeScene.width / 2, sizeScene.height - 50)

    const text = this.add.text(- sizeScene.width / 3.06, -50, 'Loading ...', { fontSize: 25, fontFamily: 'Oswald', align: 'center' });
    const percent = this.add.text(sizeScene.width / 3.46, -50, '', { fontSize: 25, fontFamily: 'Oswald', align: 'center' });

    const ruler = this.add.image(0, 0, 'login-assets', 'ruler.png');

    const bar = this.add.nineslice(-ruler.width / 2, 0, 'login-assets', 'bar.png', 0, 0, 0, 0);
    bar.setOrigin(0, 0.5);

    loading.add([ruler, bar, text, percent])
    const sizeBar = ruler.width;
    this.tweensLoading = this.tweens.add({
      targets: bar,
      width: sizeBar,
      duration: 2000,
      ease: 'sine.inout',
      yoyo: false,
      onActive: () => {
        game_v2.scene.stop('SceneSelectSkill')
        game_v2.scene.stop('SceneLobby')
        game_v2.scene.stop('SceneWaitingRoom')
        game_v2.scene.stop('pve')
      },
      onUpdate: (i) => {
        const total = this.tweensLoading.data[0] as any
        const current = this.tweensLoading.data[0] as any
        const number = (100 * (current.current / total.end)).toFixed(0)
        percent.setText(`${number}%`)
      },
      onComplete: () => {
        game_v2.scene.stop('SceneLoading')
      }
    })

  }
}