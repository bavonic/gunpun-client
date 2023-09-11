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
const ws_transport_1 = require("@colyseus/ws-transport");
const colyseus_1 = require("colyseus");
const http_1 = require("http");
const AppConfigs_1 = require("./AppConfigs");
const app_1 = require("./app");
const chatLobby_room_1 = require("./modules/chat-lobby/chatLobby.room");
const database_1 = require("./modules/database");
const DemoPve1_map_1 = require("./modules/matchs/maps/DemoPve1.map");
const utils_1 = require("./utils");
const DemoPVP1Vs1_map_1 = require("./modules/matchs/maps/DemoPVP1Vs1.map");
const DemoPve2_map_1 = require("./modules/matchs/maps/DemoPve2.map");
const DemoPVP2Vs2_map_1 = require("./modules/matchs/maps/DemoPVP2Vs2.map");
const SkillChecking_map_1 = require("./modules/matchs/maps/SkillChecking.map");
const DemoPlayer_map_1 = require("./modules/matchs/maps/DemoPlayer.map");
const redis_1 = require("./modules/redis");
const DemoPVP3Vs3_map_1 = require("./modules/matchs/maps/DemoPVP3Vs3.map");
const Room_1 = require("./modules/matchs/lobby/types/Room");
const matchs_lobby_1 = require("./modules/matchs/matchs.lobby");
const DemoPve4_map_1 = require("./modules/matchs/maps/DemoPve4.map");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // ======================= Log Environments =======================
        console.log(`\n------- Environments ------`);
        Object.keys(AppConfigs_1.initialEnvs).map((key) => console.log(`- ${key}: ${(0, AppConfigs_1.getEnv)(key)}`));
        console.log('\n');
        yield (0, database_1.connectDatabase)();
        yield redis_1.RedisModule.initialize()
            .then(() => (0, utils_1.logger)('INFO', 'Redis connected.'))
            .catch((error) => {
            (0, utils_1.logger)('ERROR', 'RedisModule.initialize', error);
            process.exit(1);
        });
        const apiServer = (0, http_1.createServer)(app_1.app);
        const server = new colyseus_1.Server({ transport: new ws_transport_1.WebSocketTransport({ server: apiServer }) });
        // Lobby Room
        // server.define('lobby', LobbyRoom);
        server.define(chatLobby_room_1.ChatLobbyRoom.roomName, chatLobby_room_1.ChatLobbyRoom)
            .enableRealtimeListing();
        // Game Room
        server.define(DemoPve1_map_1.DemoPve1.config.id, DemoPve1_map_1.DemoPve1);
        server.define(DemoPve2_map_1.DemoPve2.config.id, DemoPve2_map_1.DemoPve2);
        // server.define(DemoPve3.config.id, DemoPve3);
        server.define(DemoPve4_map_1.DemoPve4.config.id, DemoPve4_map_1.DemoPve4);
        server.define(DemoPVP1Vs1_map_1.DemoPVP1Vs1.config.id, DemoPVP1Vs1_map_1.DemoPVP1Vs1);
        server.define(DemoPVP2Vs2_map_1.DemoPVP2Vs2.config.id, DemoPVP2Vs2_map_1.DemoPVP2Vs2);
        server.define(DemoPVP3Vs3_map_1.DemoPVP3Vs3.config.id, DemoPVP3Vs3_map_1.DemoPVP3Vs3);
        server.define(SkillChecking_map_1.SkillChecking.config.id, SkillChecking_map_1.SkillChecking);
        server.define(DemoPlayer_map_1.DemoPlayer.config.id, DemoPlayer_map_1.DemoPlayer);
        //
        // server.define(RoomType.LOBBY, LobbyRoom)
        server.define(Room_1.RoomType.LOBBY, matchs_lobby_1.MatchLobby);
        //
        server.listen(AppConfigs_1.PORT);
        (0, utils_1.logger)('INFO', `Server started port: ${AppConfigs_1.PORT}`);
    });
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5REFBNEQ7QUFDNUQsdUNBQTZDO0FBQzdDLCtCQUFvQztBQUNwQyw2Q0FBeUQ7QUFDekQsK0JBQTRCO0FBQzVCLHdFQUFvRTtBQUNwRSxpREFBcUQ7QUFDckQscUVBQThEO0FBQzlELG1DQUFpQztBQUNqQywyRUFBb0U7QUFDcEUscUVBQThEO0FBRTlELDJFQUFvRTtBQUNwRSwrRUFBd0U7QUFDeEUseUVBQWtFO0FBQ2xFLDJDQUE4QztBQUM5QywyRUFBb0U7QUFDcEUsNERBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxxRUFBOEQ7QUFFOUQsU0FBZSxJQUFJOztRQUNqQixtRUFBbUU7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFBLG1CQUFNLEVBQUMsR0FBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQixNQUFNLElBQUEsMEJBQWUsR0FBRSxDQUFDO1FBRXhCLE1BQU0sbUJBQVcsQ0FBQyxVQUFVLEVBQUU7YUFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUEsY0FBTSxFQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2FBQzlDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2YsSUFBQSxjQUFNLEVBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ2hELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUE7UUFFSixNQUFNLFNBQVMsR0FBRyxJQUFBLG1CQUFZLEVBQUMsU0FBRyxDQUFDLENBQUM7UUFFcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksaUNBQWtCLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEYsYUFBYTtRQUNiLHFDQUFxQztRQUVyQyxNQUFNLENBQUMsTUFBTSxDQUFDLDhCQUFhLENBQUMsUUFBUSxFQUFFLDhCQUFhLENBQUM7YUFDakQscUJBQXFCLEVBQUUsQ0FBQTtRQUUxQixZQUFZO1FBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsdUJBQVEsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLHVCQUFRLENBQUMsQ0FBQztRQUM1QywrQ0FBK0M7UUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsdUJBQVEsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsNkJBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLDZCQUFXLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLDZCQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSw2QkFBVyxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyw2QkFBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsNkJBQVcsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsaUNBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGlDQUFhLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsTUFBTSxDQUFDLDJCQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSwyQkFBVSxDQUFDLENBQUM7UUFDaEQsRUFBRTtRQUNGLDJDQUEyQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQVEsQ0FBQyxLQUFLLEVBQUUseUJBQVUsQ0FBQyxDQUFBO1FBQ3pDLEVBQUU7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFJLENBQUMsQ0FBQztRQUVwQixJQUFBLGNBQU0sRUFBQyxNQUFNLEVBQUUsd0JBQXdCLGlCQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FBQTtBQUVELElBQUksRUFBRSxDQUFDIn0=