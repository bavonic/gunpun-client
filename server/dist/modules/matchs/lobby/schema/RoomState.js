"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomState = exports.ChatMessage = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.name = '';
        this.x = 800;
        this.y = 600;
        this.anim = 'adam_idle_down';
        this.readyToConnect = false;
    }
}
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", Object)
], Player.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], Player.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], Player.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", Object)
], Player.prototype, "anim", void 0);
__decorate([
    (0, schema_1.type)('boolean'),
    __metadata("design:type", Object)
], Player.prototype, "readyToConnect", void 0);
exports.Player = Player;
class ChatMessage extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.author = '';
        this.createdAt = new Date().getTime();
        this.content = '';
    }
}
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", Object)
], ChatMessage.prototype, "author", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Object)
], ChatMessage.prototype, "createdAt", void 0);
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", Object)
], ChatMessage.prototype, "content", void 0);
exports.ChatMessage = ChatMessage;
class RoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.chatMessages = new schema_1.ArraySchema();
    }
}
__decorate([
    (0, schema_1.type)({ map: Player }),
    __metadata("design:type", Object)
], RoomState.prototype, "players", void 0);
__decorate([
    (0, schema_1.type)([ChatMessage]),
    __metadata("design:type", Object)
], RoomState.prototype, "chatMessages", void 0);
exports.RoomState = RoomState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vbVN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL2xvYmJ5L3NjaGVtYS9Sb29tU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXVFO0FBSXZFLE1BQWEsTUFBTyxTQUFRLGVBQU07SUFBbEM7O1FBQ2tCLFNBQUksR0FBRyxFQUFFLENBQUE7UUFDVCxNQUFDLEdBQUcsR0FBRyxDQUFBO1FBQ1AsTUFBQyxHQUFHLEdBQUcsQ0FBQTtRQUNQLFNBQUksR0FBRyxnQkFBZ0IsQ0FBQTtRQUN0QixtQkFBYyxHQUFHLEtBQUssQ0FBQTtJQUN6QyxDQUFDO0NBQUE7QUFMaUI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O29DQUFVO0FBQ1Q7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O2lDQUFRO0FBQ1A7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O2lDQUFRO0FBQ1A7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O29DQUF3QjtBQUN0QjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7OzhDQUF1QjtBQUx6Qyx3QkFNQztBQUVELE1BQWEsV0FBWSxTQUFRLGVBQU07SUFBdkM7O1FBQ2tCLFdBQU0sR0FBRyxFQUFFLENBQUE7UUFDWCxjQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoQyxZQUFPLEdBQUcsRUFBRSxDQUFBO0lBQzlCLENBQUM7Q0FBQTtBQUhpQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7MkNBQVk7QUFDWDtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7OENBQWlDO0FBQ2hDO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDOzs0Q0FBYTtBQUg5QixrQ0FJQztBQU9ELE1BQWEsU0FBVSxTQUFRLGVBQU07SUFBckM7O1FBRUUsWUFBTyxHQUFHLElBQUksa0JBQVMsRUFBVSxDQUFBO1FBRWpDLGlCQUFZLEdBQUcsSUFBSSxvQkFBVyxFQUFlLENBQUE7SUFDL0MsQ0FBQztDQUFBO0FBSEM7SUFEQyxJQUFBLGFBQUksRUFBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs7MENBQ1c7QUFFakM7SUFEQyxJQUFBLGFBQUksRUFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzsrQ0FDeUI7QUFKL0MsOEJBS0MifQ==