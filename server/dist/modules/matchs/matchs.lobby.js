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
exports.MatchLobby = void 0;
const colyseus_1 = require("colyseus");
const RoomState_1 = require("./lobby/schema/RoomState");
const matchs_types_1 = require("./matchs.types");
const matchs_router_1 = require("./matchs.router");
class MatchLobby extends colyseus_1.Room {
    onCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState(new RoomState_1.RoomState());
            // // when receiving updatePlayer message, call the PlayerUpdateCommand
            // this.onMessage(
            //   MessageRoom.UPDATE_PLAYER,
            //   (client, message: { x: number; y: number; anim: string }) => {
            //     this.dispatcher.dispatch(new PlayerUpdateCommand(), {
            //       client,
            //       x: message.x,
            //       y: message.y,
            //       anim: message.anim,
            //     })
            //   }
            // )
            // // when receiving updatePlayerName message, call the PlayerUpdateNameCommand
            // this.onMessage(MessageRoom.UPDATE_PLAYER_NAME, (client, message: { name: string }) => {
            //   this.dispatcher.dispatch(new PlayerUpdateNameCommand(), {
            //     client,
            //     name: message.name,
            //   })
            // })
            // this.onMessage(MessageRoom.READY_TO_CONNECT, (client) => {
            //   const player = this.state.players.get(client.sessionId)
            //   if (player) player.readyToConnect = true
            // })
            // // when a player send a chat message, update the message array and broadcast to all connected clients except the sender
            // this.onMessage(MessageRoom.ADD_CHAT_MESSAGE, (client, message: { content: string }) => {
            //   // update the message array (so that players join later can also see the message)
            //   this.dispatcher.dispatch(new ChatMessageUpdateCommand(), {
            //     client,
            //     content: message.content,
            //   })
            //   // broadcast to all currently connected clients except the sender (to render in-game dialog on top of the character)
            //   this.broadcast(
            //     MessageRoom.ADD_CHAT_MESSAGE,
            //     { clientId: client.sessionId, content: message.content },
            //     { except: client }
            //   )
            // })
        });
    }
    onAuth(client, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onJoin(client, options) {
        // this.state.players.set(client.sessionId, new Player())
        console.log(`Client ${client.id} join lobby`);
        this.messageJoinLobby(client);
    }
    onLeave(client, consented) {
        // if (this.state.players.has(client.sessionId)) {
        //   this.state.players.delete(client.sessionId)
        // }
        console.log(`Client ${client.id} leave lobby`);
    }
    onDispose() {
        console.log('room', this.roomId, 'disposing...');
    }
    messageJoinLobby(client) {
        client.send(matchs_types_1.LobbyEvent.MAP_GAME, { data: matchs_router_1.mapConfigs });
        this.onMessage(matchs_types_1.LobbyEvent.CREATE_ROOM, () => {
            this.broadcast(matchs_types_1.LobbyEvent.CREATE_ROOM);
        });
    }
}
exports.MatchLobby = MatchLobby;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hzLmxvYmJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL21hdGNocy5sb2JieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSx1Q0FBd0M7QUFDeEMsd0RBQTZEO0FBQzdELGlEQUF5RDtBQUl6RCxtREFBNkM7QUFHN0MsTUFBYSxVQUFXLFNBQVEsZUFBZTtJQUV2QyxRQUFROztZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxxQkFBUyxFQUFFLENBQUMsQ0FBQTtZQUM5Qix1RUFBdUU7WUFDdkUsa0JBQWtCO1lBQ2xCLCtCQUErQjtZQUMvQixtRUFBbUU7WUFDbkUsNERBQTREO1lBQzVELGdCQUFnQjtZQUNoQixzQkFBc0I7WUFDdEIsc0JBQXNCO1lBQ3RCLDRCQUE0QjtZQUM1QixTQUFTO1lBQ1QsTUFBTTtZQUNOLElBQUk7WUFFSiwrRUFBK0U7WUFDL0UsMEZBQTBGO1lBQzFGLDhEQUE4RDtZQUM5RCxjQUFjO1lBQ2QsMEJBQTBCO1lBQzFCLE9BQU87WUFDUCxLQUFLO1lBRUwsNkRBQTZEO1lBQzdELDREQUE0RDtZQUM1RCw2Q0FBNkM7WUFDN0MsS0FBSztZQUVMLDBIQUEwSDtZQUMxSCwyRkFBMkY7WUFDM0Ysc0ZBQXNGO1lBQ3RGLCtEQUErRDtZQUMvRCxjQUFjO1lBQ2QsZ0NBQWdDO1lBQ2hDLE9BQU87WUFFUCx5SEFBeUg7WUFDekgsb0JBQW9CO1lBQ3BCLG9DQUFvQztZQUNwQyxnRUFBZ0U7WUFDaEUseUJBQXlCO1lBQ3pCLE1BQU07WUFDTixLQUFLO1FBQ1AsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLE1BQWMsRUFBRSxPQUFvQzs7WUFDL0QsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQVk7UUFDakMseURBQXlEO1FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjLEVBQUUsU0FBa0I7UUFDeEMsa0RBQWtEO1FBQ2xELGdEQUFnRDtRQUNoRCxJQUFJO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLE1BQU0sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBYztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLDBCQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMseUJBQVUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMseUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTFFRCxnQ0EwRUMifQ==