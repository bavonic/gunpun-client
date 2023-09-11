"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatsModule = void 0;
const utils_1 = require("../../utils");
const database_1 = require("../database");
const module_1 = require("../match-histories/module");
const matchs_types_1 = require("../matchs/matchs.types");
const redis_1 = require("../redis");
const module_2 = require("../users/module");
const entity_1 = require("./entity");
const types_1 = require("./types");
const repo = database_1.databaseSource.getMongoRepository(entity_1.UserStatEntity);
class UserStatsModule {
    static get(userId, forceUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            // Caching Related
            const cacheKey = `${userId}-TOKEN-PRICES-V1`;
            const cached = forceUpdate ? undefined : yield redis_1.RedisModule.get(cacheKey);
            if (cached)
                return cached;
            const user = yield module_2.UserModule.getById(userId);
            const matchHistories = yield module_1.MatchHistoriesModule.getUserRelated(userId);
            let matchs = 0;
            let winMatchs = 0;
            let pveMatchs = 0;
            let pveWinMatchs = 0;
            let pvpMatchs = 0;
            let pvpWinMatchs = 0;
            matchHistories.map((match) => {
                var _a;
                const isWin = !!((_a = match.result.users.find(v => v.id === userId)) === null || _a === void 0 ? void 0 : _a.isWin);
                matchs += 1;
                if (isWin)
                    winMatchs += 1;
                if ([matchs_types_1.MapMode.DEMO_PVE].includes(match.map.mode)) {
                    pveMatchs += 1;
                    if (isWin)
                        pveWinMatchs += 1;
                }
                if ([matchs_types_1.MapMode.DEMO_PVP].includes(match.map.mode)) {
                    pvpMatchs += 1;
                    if (isWin)
                        pvpWinMatchs += 1;
                }
            });
            const userStats = (yield repo.findOne({ where: { userId } })) || new entity_1.UserStatEntity();
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
            yield repo.save(userStats);
            // Add to Redis
            yield redis_1.RedisModule.set(cacheKey, userStats, { EX: 60 * 5 });
            return userStats;
        });
    }
    static getUserRanking(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const rankingType = type || types_1.RankingType.PVP;
            if (!Object.values(types_1.RankingType).includes(rankingType))
                throw new utils_1.ServerError(utils_1.ErrorMessage.INVALID_RANKING_TYPE, 400);
            const ranking = yield this.getRanking({ type: rankingType }, true);
            let rankOutput = 0;
            ranking.data.map((user, key) => {
                if (user.userId === userId)
                    rankOutput = key + 1;
            });
            return {
                rank: rankOutput,
                stats: yield this.get(userId)
            };
        });
    }
    static getRanking(query, isGetAll) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempQuery = (0, database_1.parseFromQuery)(query);
            let offset = tempQuery.offset;
            let limit = tempQuery.limit;
            const rankingType = query.type || types_1.RankingType.PVP;
            if (!Object.values(types_1.RankingType).includes(rankingType))
                throw new utils_1.ServerError(utils_1.ErrorMessage.INVALID_RANKING_TYPE, 400);
            let where = {};
            let order = {};
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
            const data = yield repo
                .findAndCount({
                order,
                where,
                skip: offset,
                take: limit,
            });
            return {
                count: data[1],
                data: data[0]
            };
        });
    }
    static reCalculate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield repo.find({});
            const output = yield Promise.all(data.map((data) => this.get(data.userId, true)));
            return {
                data: output
            };
        });
    }
}
exports.UserStatsModule = UserStatsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlci1zdGF0cy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXdEO0FBQ3hELDBDQUE2RDtBQUM3RCxzREFBaUU7QUFFakUseURBQWlEO0FBQ2pELG9DQUF1QztBQUN2Qyw0Q0FBNkM7QUFDN0MscUNBQTBDO0FBQzFDLG1DQUFzRDtBQUV0RCxNQUFNLElBQUksR0FBRyx5QkFBYyxDQUFDLGtCQUFrQixDQUFDLHVCQUFjLENBQUMsQ0FBQztBQUUvRCxNQUFhLGVBQWU7SUFDMUIsTUFBTSxDQUFPLEdBQUcsQ0FBQyxNQUFjLEVBQUUsV0FBcUI7O1lBQ3BELGtCQUFrQjtZQUNsQixNQUFNLFFBQVEsR0FBRyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7WUFDN0MsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sbUJBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekUsSUFBSSxNQUFNO2dCQUFFLE9BQU8sTUFBYSxDQUFDO1lBRWpDLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUMsTUFBTSxjQUFjLEdBQUcsTUFBTSw2QkFBb0IsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekUsSUFBSSxNQUFNLEdBQVcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztZQUUxQixJQUFJLFNBQVMsR0FBVyxDQUFDLENBQUM7WUFDMUIsSUFBSSxZQUFZLEdBQVcsQ0FBQyxDQUFDO1lBRTdCLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztZQUMxQixJQUFJLFlBQVksR0FBVyxDQUFDLENBQUM7WUFFN0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtB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