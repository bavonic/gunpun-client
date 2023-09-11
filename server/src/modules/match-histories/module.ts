import { MatchResult } from "../../GameTypes";
import { DateTimeUtils, logger } from "../../utils";
import { databaseSource, parseFromQuery } from "../database";
import { MapConfig } from "../matchs/matchs.types";
import { UserStatsModule } from "../user-stats/module";
import { MatchHistoryEntity } from "./entity";
import { MatchHistoriesQuery } from "./types";

const repo = databaseSource.getMongoRepository(MatchHistoryEntity);

export class MatchHistoriesModule {
  static async capture(payload: { roomId: string, result: MatchResult, map: MapConfig }) {
    try {
      const data = new MatchHistoryEntity();
      data.roomId = payload.roomId;
      data.result = payload.result;
      data.time = DateTimeUtils.timeToSeconds();
      data.userIds = payload.result.users.map(v => v.id);
      data.map = payload.map;
      await Promise.all(data.userIds.map(async (userId) => {
        return UserStatsModule.get(userId, true).catch(() => false);
      }))
      await repo.save(data);
      return data;
    } catch (error) {
      logger('ERROR', `MatchHistoriesModule.capture > Payload: ${JSON.stringify(payload)}`, error);
    }
  }

  static async getUserRelated(userId: string) {
    return repo.find({ where: { "userIds": { $in: [userId] } } })
  }

  static async getList(query: MatchHistoriesQuery) {
    const { limit, offset } = parseFromQuery(query);

    let where: any = {};
    let order: any = { time: -1 };

    if (query.mapMode) {
      where["map.mode"] = query.mapMode;
    }

    if (query.userId) {
      where["userIds"] = { $in: [query.userId] };
    }

    const data = await repo
      .findAndCount({
        order,
        where,
        skip: +offset,
        take: +limit,
      })

    return {
      count: data[1],
      data: data[0]
    }
  }
}