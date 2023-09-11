import { DatabaseQuery } from "../database";

export enum RankingType {
  PVP = 'PVP',
  PVE = 'PVE',
}

export interface UserStatsQuery extends DatabaseQuery {
  type?: RankingType
}