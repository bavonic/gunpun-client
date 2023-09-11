export type MapScene = any;

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
  players: { id: string, teamId: TeamId, controller: string, isWin: boolean }[],
  users: { id: string, teamId: TeamId, isWin: boolean }[],
  isDraw?: boolean,
}

export type WindDirection = 'LEFT' | 'RIGHT';