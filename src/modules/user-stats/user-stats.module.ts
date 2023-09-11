import { RequestGameModule } from "modules/request";
import { UserStatEntity, UserStatsQuery } from "./user-stats.types";

export class UserStatModule {
  static async ranking(query: UserStatsQuery) {
    return RequestGameModule.get('/api/user-stats/ranking', query)
  }

  static async rankByUserId(userId: string): Promise<{ rank: number, stats: UserStatEntity }> {
    return RequestGameModule.get(`/api/user-stats/ranking/${userId}`)
  }
}