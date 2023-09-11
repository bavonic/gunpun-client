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
exports.ChatLobbyMessageEntity = void 0;
const typeorm_1 = require("typeorm");
let ChatLobbyMessageEntity = class ChatLobbyMessageEntity {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectId)
], ChatLobbyMessageEntity.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatLobbyMessageEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatLobbyMessageEntity.prototype, "userWallet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatLobbyMessageEntity.prototype, "createdAt", void 0);
ChatLobbyMessageEntity = __decorate([
    (0, typeorm_1.Entity)('chat-lobby-message')
], ChatLobbyMessageEntity);
exports.ChatLobbyMessageEntity = ChatLobbyMessageEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdExvYmJ5LmVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2NoYXQtbG9iYnkvY2hhdExvYmJ5LmVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBa0U7QUFHbEUsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7Q0FZbEMsQ0FBQTtBQVZDO0lBREMsSUFBQSx3QkFBYyxHQUFFOzhCQUNaLGtCQUFRO21EQUFBO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O3VEQUNNO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzBEQUNTO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxHQUFFOzt5REFDUTtBQVhOLHNCQUFzQjtJQURsQyxJQUFBLGdCQUFNLEVBQUMsb0JBQW9CLENBQUM7R0FDaEIsc0JBQXNCLENBWWxDO0FBWlksd0RBQXNCIn0=