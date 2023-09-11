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
exports.ChatLobbyModule = exports.chatLobbyMessageRepository = void 0;
const AppConfigs_1 = require("../../AppConfigs");
const utils_1 = require("../../utils");
const number_utils_1 = require("../../utils/number.utils");
const database_1 = require("../database");
const chatLobby_entity_1 = require("./chatLobby.entity");
exports.chatLobbyMessageRepository = database_1.databaseSource.getMongoRepository(chatLobby_entity_1.ChatLobbyMessageEntity);
class ChatLobbyModule {
    static getList(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            let { offset, limit } = queries;
            if (!offset)
                offset = 0;
            if (!limit)
                limit = limit || +(0, AppConfigs_1.getEnv)('DATABASE_MAX_QUERY_LIMIT');
            // ======================= Validate =======================
            let errors = {};
            if (!number_utils_1.NumberUtils.isNumber(+offset))
                errors['offset'] = utils_1.ErrorMessage.MUST_BE_NUMBER;
            if (!number_utils_1.NumberUtils.isNumber(+limit))
                errors['limit'] = utils_1.ErrorMessage.MUST_BE_NUMBER;
            (0, utils_1.ThrowPayloadError)(errors);
            const data = yield exports.chatLobbyMessageRepository.findAndCount({
                order: {
                    createdAt: 'DESC',
                },
                skip: +offset,
                take: +limit,
            });
            return {
                count: data[1],
                data: data[0]
            };
        });
    }
    static save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.chatLobbyMessageRepository.save(data);
        });
    }
}
exports.ChatLobbyModule = ChatLobbyModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdExvYmJ5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2NoYXQtbG9iYnkvY2hhdExvYmJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBMEM7QUFFMUMsdUNBQThEO0FBQzlELDJEQUF1RDtBQUN2RCwwQ0FBNkM7QUFDN0MseURBQTREO0FBRS9DLFFBQUEsMEJBQTBCLEdBQUcseUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyx5Q0FBc0IsQ0FBQyxDQUFDO0FBRXBHLE1BQWEsZUFBZTtJQUMxQixNQUFNLENBQU8sT0FBTyxDQUFDLE9BQWdCOztZQUNuQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQWMsQ0FBQztZQUV2QyxJQUFJLENBQUMsTUFBTTtnQkFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLO2dCQUFFLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFBLG1CQUFNLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUVqRSwyREFBMkQ7WUFDM0QsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQywwQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxjQUFjLENBQUM7WUFDbkYsSUFBSSxDQUFDLDBCQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxvQkFBWSxDQUFDLGNBQWMsQ0FBQztZQUNqRixJQUFBLHlCQUFpQixFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0NBQTBCLENBQUMsWUFBWSxDQUFDO2dCQUN6RCxLQUFLLEVBQUU7b0JBQ0wsU0FBUyxFQUFFLE1BQU07aUJBQ2xCO2dCQUNELElBQUksRUFBRSxDQUFDLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLENBQUMsS0FBSzthQUNiLENBQUMsQ0FBQTtZQUVGLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDZCxDQUFBO1FBQ0gsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLElBQUksQ0FBQyxJQUE0Qjs7WUFDNUMsT0FBTyxrQ0FBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztLQUFBO0NBQ0Y7QUE5QkQsMENBOEJDIn0=