
export class ButtonTweens extends Phaser.GameObjects.Image {
  constructor(config: { scene: Phaser.Scene, x: number, y: number, texture: string, frame: string, fn: () => void }) {
    super(config.scene, config.x, config.y, config.texture, config.frame)

    config.scene.add.existing(this);
    const sound = config.scene.sound.add('click');
    this.setInteractive();
    this.on('pointerdown', async () => {
      sound.play()
      config.scene.tweens.add({
        targets: this,
        scale: 0.95,
        yoyo: true,
        duration: 30,
        onComplete: i => {
          i.destroy();
          config.scene.sound.add('click').stop();
        },
        onActive: config.fn
      })
    })
  }
}