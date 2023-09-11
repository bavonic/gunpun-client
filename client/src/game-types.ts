import { RoomAvailable } from 'colyseus.js';
import { MatchScene } from 'game-play-v2/scenes/main-monitor/game/match-game/match.scene';
import type Phaser from 'phaser'

export { MatchScene as MapScene }

export type StaticGroup = Phaser.Physics.Arcade.StaticGroup;
export type DynamicGroup = Phaser.Physics.Arcade.Group;
export type StaticImage = Phaser.Physics.Arcade.Image;
export type GameObject = Phaser.GameObjects.GameObject;
export type CanvasTexture = Phaser.Textures.CanvasTexture;


// ======================= Server Types =======================
export interface GameObjectStat {
  id: string,
  w: number,
  h: number,
  x: number,
  y: number,
}

export interface PlayerStat {
  id: string,
  x: number,
  y: number,
  size: number,
  teamId: TeamId,
}

export type TeamId = 'A' | 'B';

export interface MatchResult {
  players: { id: string, isWin: boolean }[],
  users: { id: string, isWin: boolean }[],
  isDraw?: boolean,
}

export type WindDirection = 'LEFT' | 'RIGHT';