import Phaser from 'phaser';
import { matchAssets } from '../game-play.assets';
import { wait } from 'game-play-v2/game-play/game-play.utils';
import { game_v2 } from 'screens/game-v2';
import { SceneController } from 'game-play-v2/scenes/sub-monitor/SceneController';

export class UiAlert {
  static async playerTurn(scene: Phaser.Scene, isController: boolean) {
    const duration = 1500;
    if (isController) {
      const image = scene.add.image(
        +scene.game.config.width / 2 - 100,
        +scene.game.config.height / 2,
        matchAssets.imgYourTurn.key,
      )
        .setAlpha(0.5)
        .setScale(0.9)
        .setScrollFactor(0)
        .setDepth(100)

      const tween = scene.tweens.add({
        targets: image,
        ease: 'Power1',
        repeat: 0,
        alpha: 1,
        x: image.x + 100,
        y: image.y - 50,
        scale: 1,
        duration: 400,
      })

      setTimeout(() => {
        image.destroy();
        tween.destroy();
      }, duration);
    }

    await wait(1500);
  }

  static async matchTimeout(scene: Phaser.Scene) {
    const image = scene.add.image(
      +scene.game.config.width / 2,
      +scene.game.config.height / 2,
      matchAssets.imgTimeOut.key,
    )
      .setAlpha(0.5)
      .setScale(0.8)
      .setScrollFactor(0);

    const duration = 800;

    scene.tweens.add({
      targets: image,
      repeat: 0,
      alpha: 1,
      scale: 1,
      duration: duration / 2,
    })
  }
}