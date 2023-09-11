"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@colyseus/command");
class PlayerUpdateNameCommand extends command_1.Command {
    execute(data) {
        const { client, name } = data;
        const player = this.room.state.players.get(client.sessionId);
        if (!player)
            return;
        player.name = name;
    }
}
exports.default = PlayerUpdateNameCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyVXBkYXRlTmFtZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tYXRjaHMvbG9iYnkvY29tbWFuZHMvUGxheWVyVXBkYXRlTmFtZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBMkM7QUFTM0MsTUFBcUIsdUJBQXdCLFNBQVEsaUJBQWtDO0lBQ3JGLE9BQU8sQ0FBQyxJQUFhO1FBQ25CLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRTdCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRTVELElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTTtRQUNuQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUFURCwwQ0FTQyJ9