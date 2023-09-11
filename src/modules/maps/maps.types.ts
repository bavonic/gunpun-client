import { GameObjectStat } from "game-types";

export interface MapConfig {
  id: string,
  name?: string,
  mode: MapMode,
  width: number,
  height: number,
  backgroundMode: MapBackgroundMode,
  assetUrl: string,
  numberOfPlayers: number,
  totalTime: number,
  totalTurnTime: number,
}

export enum MapMode {
  DEMO_PVE = 'DEMO_PVE',
  DEMO_PVP = 'DEMO_PVP',
  DEMO_RANKING = 'DEMO_RANKING',
}

export enum MapBackgroundMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface PlatformStats extends GameObjectStat {
}