import Phaser from 'phaser'
import { LobbyRoom } from './scenes/MatchLobbyRoom';
import LoadAssets from './scenes/PreparationAssets';

export const configLobby = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  backgroundColor: '#93cbee',
  pixelArt: true, // Prevent pixel art from becoming blurred when scaled.
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  scene: [LoadAssets, LobbyRoom],
}