import { ErrorMessage, ServerError } from "../../utils";
import { databaseSource, parseFromQuery } from "../database";
import { MatchHistoriesModule } from "../match-histories/module";
import { DemoPVP1Vs1 } from "../matchs/maps/DemoPVP1Vs1.map";
import { MapMode } from "../matchs/matchs.types";
import { RedisModule } from "../redis";
import { UserModule } from "../users/module";
import { UserStatEntity } from "./entity";
import { RankingType, UserStatsQuery } from "./types";

const repo = databaseSource.getMongoRepository(UserStatEntity);

export class UserStatsModule {
  static async get(userId: string, forceUpdate?: boolean) {
    // Caching Related
    const cacheKey = `${userId}-TOKEN-PRICES-V1`;
    const cached = forceUpdate ? undefined : await RedisModule.get(cacheKey);
    if (cached) return cached as any;

    const user = await UserModule.getById(userId);
    const matchHistories = await MatchHistoriesModule.getUserRelated(userId);

    let matchs: number = 0;
    let winMatchs: number = 0;

    let pveMatchs: number = 0;
    let pveWinMatchs: number = 0;

    let pvpMatchs: number = 0;
    let pvpWinMatchs: number = 0;

    matchHistories.map((match) => {
      const isWin = !!(match.result.users.find(v => v.id === userId)?.isWin);

      matchs += 1;
      if (isWin) winMatchs += 1;

      if ([MapMode.DEMO_PVE].includes(match.map.mode)) {
        pveMatchs += 1;
        if (isWin) pveWinMatchs += 1;
      }

      if ([MapMode.DEMO_PVP].includes(match.map.mode)) {
        pvpMatchs += 1;
        if (isWin) pvpWinMatchs += 1;
      }
    })

    const userStats = await repo.findOne({ where: { userId } }) || new UserStatEntity();
    userStats.userId = userId;
    userStats.user = user;
    userStats.matchs = matchs;
    userStats.winRate = (winMatchs / matchs) || 0;

    userStats.pveMatchs = pveMatchs;
    userStats.pveWinRate = !!pveMatchs ? (pveWinMatchs / pveMatchs) : 0;
    userStats.pvePoints = Math.floor(!!userStats.pveWinRate && !!userStats.pveMatchs ? (userStats.pveWinRate * userStats.pveMatchs) : 0);

    userStats.pvpMatchs = pvpMatchs;
    userStats.pvpWinRate = !!pvpMatchs ? (pvpWinMatchs / pvpMatchs) : 0;
    userStats.pvpPoints = Math.floor(!!userStats.pvpWinRate && !!userStats.pvpMatchs ? (userStats.pvpWinRate * userStats.pvpMatchs) : 0);

    await repo.save(userStats);

    // Add to Redis
    await RedisModule.set(cacheKey, userStats, { EX: 60 * 5 });

    return userStats;
  }

  static async getUserRanking(userId: string, type: RankingType) {
    const rankingType = type || RankingType.PVP;
    if (!Object.values(RankingType).includes(rankingType)) throw new ServerError(ErrorMessage.INVALID_RANKING_TYPE, 400);

    const ranking = await this.getRanking({ type: rankingType }, true);
    let rankOutput = 0;

    ranking.data.map((user, key) => {
      if (user.userId === userId) rankOutput = key + 1;
    })

    return {
      rank: rankOutput,
      stats: await this.get(userId)
    }
  }

  static async getRanking(query: UserStatsQuery, isGetAll?: boolean) {
    const tempQuery = parseFromQuery(query);
    let offset = tempQuery.offset;
    let limit = tempQuery.limit;

    const rankingType = query.type || RankingType.PVP;
    if (!Object.values(RankingType).includes(rankingType)) throw new ServerError(ErrorMessage.INVALID_RANKING_TYPE, 400);

    let where: any = {};
    let order: any = {};

    if (rankingType === 'PVE') {
      where["pvePoints"] = { $gt: 0 };
      order["pvePoints"] = -1;
    }

    if (rankingType === 'PVP') {
      where["pvpPoints"] = { $gt: 0 };
      order["pvpPoints"] = -1;
    }

    if (isGetAll) {
      offset = 0;
      limit = undefined;
    }

    const data = await repo
      .findAndCount({
        order,
        where,
        skip: offset,
        take: limit,
      })

    return {
      count: data[1],
      data: data[0]
    }
  }

  static async reCalculate() {
    const data = await repo.find({});
    const output = await Promise.all(data.map((data) => this.get(data.userId, true)));

    return {
      data: output
    }
  }
}