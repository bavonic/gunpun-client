import { IS_DEV } from 'modules/configs/context';
import Phaser from 'phaser';

export const getGameConfig = (config: Phaser.Types.Core.GameConfig, debug = IS_DEV): Phaser.Types.Core.GameConfig => {
  return {
    ...config,
    dom: {
      createContainer: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: true,
      }
    }
  }
}