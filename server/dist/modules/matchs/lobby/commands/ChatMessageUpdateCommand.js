"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@colyseus/command");
const RoomState_1 = require("../schema/RoomState");
class ChatMessageUpdateCommand extends command_1.Command {
    execute(data) {
        const { client, content } = data;
        const player = this.room.state.players.get(client.sessionId);
        const chatMessages = this.room.state.chatMessages;
        if (!chatMessages)
            return;
        /**
         * Only allow server to store a maximum of 100 chat messages:
         * remove the first element before pushing a new one when array length is >= 100
         */
        if (chatMessages.length >= 100)
            chatMessages.shift();
        const newMessage = new RoomState_1.ChatMessage();
        newMessage.author = player.name;
        newMessage.content = content;
        chatMessages.push(newMessage);
    }
}
exports.default = ChatMessageUpdateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdE1lc3NhZ2VVcGRhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL2xvYmJ5L2NvbW1hbmRzL0NoYXRNZXNzYWdlVXBkYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUEyQztBQUUzQyxtREFBaUQ7QUFTakQsTUFBcUIsd0JBQXlCLFNBQVEsaUJBQWtDO0lBQ3RGLE9BQU8sQ0FBQyxJQUFhO1FBQ25CLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzVELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUVqRCxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU07UUFFekI7OztXQUdHO1FBQ0gsSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLEdBQUc7WUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7UUFFcEQsTUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVyxFQUFFLENBQUE7UUFDcEMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQy9CLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQzVCLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDL0IsQ0FBQztDQUNGO0FBbkJELDJDQW1CQyJ9