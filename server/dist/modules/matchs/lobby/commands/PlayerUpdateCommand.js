"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@colyseus/command");
class PlayerUpdateCommand extends command_1.Command {
    execute(data) {
        const { client, x, y, anim } = data;
        const player = this.room.state.players.get(client.sessionId);
        if (!player)
            return;
        player.x = x;
        player.y = y;
        player.anim = anim;
    }
}
exports.default = PlayerUpdateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyVXBkYXRlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL21hdGNocy9sb2JieS9jb21tYW5kcy9QbGF5ZXJVcGRhdGVDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTJDO0FBVzNDLE1BQXFCLG1CQUFvQixTQUFRLGlCQUFrQztJQUNqRixPQUFPLENBQUMsSUFBYTtRQUNuQixNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRW5DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRTVELElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTTtRQUNuQixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNaLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1osTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDcEIsQ0FBQztDQUNGO0FBWEQsc0NBV0MifQ==