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
exports.UserSchema = void 0;
const schema_1 = require("@colyseus/schema");
const utils_1 = require("../../../utils");
const array_utils_1 = require("../../../utils/array.utils");
const skills_types_1 = require("../skills/skills.types");
class UserSchema extends schema_1.Schema {
    constructor(initial) {
        super();
        this.isHost = false;
        this.isReady = true;
        this.isLoadedAssets = false;
        this.isConnecting = true;
        this.skillIds = [];
        this.id = initial.id;
        this.isHost = typeof initial.isHost === 'boolean' ? initial.isHost : false;
        this.isReady = true;
        this.isLoadedAssets = false;
        this.isConnecting = true;
        this.data = initial.data;
        this.teamId = initial.teamId;
        this.userId = initial.userId;
        this.name = initial.name;
        this.avatar = initial.avatar;
        this.joinAt = utils_1.DateTimeUtils.timeToSeconds();
        this.skillIds = [];
    }
    setSkills(skillIds) {
        this.skillIds = array_utils_1.ArrayUtils.removeDuplicate(skillIds.filter(v => Object.values(skills_types_1.PlayerSkillId).includes(v)));
    }
}
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], UserSchema.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], UserSchema.prototype, "userId", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], UserSchema.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], UserSchema.prototype, "avatar", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], UserSchema.prototype, "joinAt", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isHost", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isReady", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isLoadedAssets", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isConnecting", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], UserSchema.prototype, "data", void 0);
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", String)
], UserSchema.prototype, "teamId", void 0);
exports.UserSchema = UserSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tYXRjaHMvc2NoZW1hcy91c2VyLnNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBZ0Q7QUFFaEQsMENBQStDO0FBQy9DLDREQUF3RDtBQUN4RCx5REFBdUQ7QUFZdkQsTUFBYSxVQUFXLFNBQVEsZUFBTTtJQWNwQyxZQUFZLE9BQW1CO1FBQzdCLEtBQUssRUFBRSxDQUFDO1FBVE8sV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzlDLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBSTdCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUyxDQUFDLFFBQXlCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQVUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztDQUNGO0FBaENpQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7c0NBQVk7QUFDWDtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7MENBQWdCO0FBQ2Y7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O3dDQUFjO0FBQ2I7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7OzBDQUFnQjtBQUNmO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDOzswQ0FBZ0I7QUFDZDtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7OzBDQUF5QjtBQUN4QjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7OzJDQUF5QjtBQUN4QjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7O2tEQUFpQztBQUNoQztJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7O2dEQUE4QjtBQUM5QjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7d0NBQWU7QUFDZDtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7MENBQWdCO0FBWGpDLGdDQWlDQyJ9