import { Query } from "types";
import { UserEntity } from "modules/user/user.types";

export enum RankingType {
  PVP = 'PVP',
  PVE = 'PVE',
}

export interface UserStatsQuery extends Query {
  type?: RankingType
}


export class UserStatEntity {
  _id: Object
  userId: string
  user: UserEntity
  matchs: number
  winRate: number
  pvePoints: number
  pveMatchs: number
  pveWinRate: number
  pvpPoints: number
  pvpMatchs: number
  pvpWinRate: number
}