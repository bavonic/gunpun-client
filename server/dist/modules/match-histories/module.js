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
exports.MatchHistoriesModule = void 0;
const utils_1 = require("../../utils");
const database_1 = require("../database");
const module_1 = require("../user-stats/module");
const entity_1 = require("./entity");
const repo = database_1.databaseSource.getMongoRepository(entity_1.MatchHistoryEntity);
class MatchHistoriesModule {
    static capture(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = new entity_1.MatchHistoryEntity();
                data.roomId = payload.roomId;
                data.result = payload.result;
                data.time = utils_1.DateTimeUtils.timeToSeconds();
                data.userIds = payload.result.users.map(v => v.id);
                data.map = payload.map;
                yield Promise.all(data.userIds.map((userId) => __awaiter(this, void 0, void 0, function* () {
                    return module_1.UserStatsModule.get(userId, true).catch(() => false);
                })));
                yield repo.save(data);
                return data;
            }
            catch (error) {
                (0, utils_1.logger)('ERROR', `MatchHistoriesModule.capture > Payload: ${JSON.stringify(payload)}`, error);
            }
        });
    }
    static getUserRelated(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return repo.find({ where: { "userIds": { $in: [userId] } } });
        });
    }
    static getList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = (0, database_1.parseFromQuery)(query);
            let where = {};
            let order = { time: -1 };
            if (query.mapMode) {
                where["map.mode"] = query.mapMode;
            }
            if (query.userId) {
                where["userIds"] = { $in: [query.userId] };
            }
            const data = yield repo
                .findAndCount({
                order,
                where,
                skip: +offset,
                take: +limit,
            });
            return {
                count: data[1],
                data: data[0]
            };
        });
    }
}
exports.MatchHistoriesModule = MatchHistoriesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2gtaGlzdG9yaWVzL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBb0Q7QUFDcEQsMENBQTZEO0FBRTdELGlEQUF1RDtBQUN2RCxxQ0FBOEM7QUFHOUMsTUFBTSxJQUFJLEdBQUcseUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQywyQkFBa0IsQ0FBQyxDQUFDO0FBRW5FLE1BQWEsb0JBQW9CO0lBQy9CLE1BQU0sQ0FBTyxPQUFPLENBQUMsT0FBZ0U7O1lBQ25GLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSwyQkFBa0IsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUN2QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtvQkFDbEQsT0FBTyx3QkFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5RCxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7Z0JBQ0gsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixPQUFPLElBQUksQ0FBQzthQUNiO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsSUFBQSxjQUFNLEVBQUMsT0FBTyxFQUFFLDJDQUEyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDOUY7UUFDSCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sY0FBYyxDQUFDLE1BQWM7O1lBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDL0QsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLE9BQU8sQ0FBQyxLQUEwQjs7WUFDN0MsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFBLHlCQUFjLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFFaEQsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO1lBQ3BCLElBQUksS0FBSyxHQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNqQixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNuQztZQUVELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDNUM7WUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUk7aUJBQ3BCLFlBQVksQ0FBQztnQkFDWixLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTTtnQkFDYixJQUFJLEVBQUUsQ0FBQyxLQUFLO2FBQ2IsQ0FBQyxDQUFBO1lBRUosT0FBTztnQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNkLENBQUE7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWxERCxvREFrREMifQ==