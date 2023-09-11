"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.connectDatabase = exports.databaseSource = void 0;
const AppConfigs_1 = require("../../AppConfigs");
const typeorm_1 = require("typeorm");
const logger_utis_1 = require("../../utils/logger.utis");
const chatLobby_entity_1 = require("../chat-lobby/chatLobby.entity");
const entity_1 = require("../match-histories/entity");
const entity_2 = require("../user-stats/entity");
__exportStar(require("./database.types"), exports);
__exportStar(require("./database.utils"), exports);
exports.databaseSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: (0, AppConfigs_1.getEnv)('DATABASE_URL'),
    entities: [
        chatLobby_entity_1.ChatLobbyMessageEntity,
        entity_1.MatchHistoryEntity,
        entity_2.UserStatEntity,
    ],
    synchronize: true,
    cache: false,
    useUnifiedTopology: true,
});
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.databaseSource.initialize()
        .then(() => (0, logger_utis_1.logger)("INFO", "Database connected."))
        .catch((error) => {
        (0, logger_utis_1.logger)('ERROR', `Database connect failed.`, error);
        process.exit(1);
    });
});
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9kYXRhYmFzZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUEwQztBQUMxQyxxQ0FBb0M7QUFDcEMseURBQWlEO0FBQ2pELHFFQUF3RTtBQUN4RSxzREFBK0Q7QUFDL0QsaURBQXNEO0FBRXRELG1EQUFnQztBQUNoQyxtREFBZ0M7QUFFbkIsUUFBQSxjQUFjLEdBQUcsSUFBSSxvQkFBVSxDQUFDO0lBQzNDLElBQUksRUFBRSxTQUFTO0lBQ2YsR0FBRyxFQUFFLElBQUEsbUJBQU0sRUFBQyxjQUFjLENBQUM7SUFDM0IsUUFBUSxFQUFFO1FBQ1IseUNBQXNCO1FBQ3RCLDJCQUFrQjtRQUNsQix1QkFBYztLQUNmO0lBQ0QsV0FBVyxFQUFFLElBQUk7SUFDakIsS0FBSyxFQUFFLEtBQUs7SUFDWixrQkFBa0IsRUFBRSxJQUFJO0NBQ3pCLENBQUMsQ0FBQTtBQUVLLE1BQU0sZUFBZSxHQUFHLEdBQVMsRUFBRTtJQUN4QyxNQUFNLHNCQUFjLENBQUMsVUFBVSxFQUFFO1NBQzlCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFBLG9CQUFNLEVBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUM7U0FDakQsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDZixJQUFBLG9CQUFNLEVBQUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEsQ0FBQTtBQVBZLFFBQUEsZUFBZSxtQkFPM0IifQ==