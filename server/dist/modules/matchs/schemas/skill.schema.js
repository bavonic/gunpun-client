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
exports.MatchPlayerSkillSchema = void 0;
const schema_1 = require("@colyseus/schema");
const skills_types_1 = require("../skills/skills.types");
class MatchPlayerSkillSchema extends schema_1.Schema {
    constructor(matchSkill) {
        super();
        this.id = matchSkill.id;
        this.recoveryTime = 0;
        this.avatar = matchSkill.avatar;
        this.lifeCycle = matchSkill.lifeCycle;
        this.isPassive = !!matchSkill.isPassive;
        this.isActivated = false;
    }
}
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], MatchPlayerSkillSchema.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], MatchPlayerSkillSchema.prototype, "isActivated", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], MatchPlayerSkillSchema.prototype, "isPassive", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], MatchPlayerSkillSchema.prototype, "avatar", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], MatchPlayerSkillSchema.prototype, "lifeCycle", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], MatchPlayerSkillSchema.prototype, "recoveryTime", void 0);
exports.MatchPlayerSkillSchema = MatchPlayerSkillSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGwuc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL3NjaGVtYXMvc2tpbGwuc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFnRDtBQUNoRCx5REFBb0U7QUFFcEUsTUFBYSxzQkFBdUIsU0FBUSxlQUFNO0lBUWhELFlBQVksVUFBdUI7UUFDakMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQWhCaUI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O2tEQUFtQjtBQUNqQjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7OzJEQUFzQjtBQUNyQjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7O3lEQUFvQjtBQUNwQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7c0RBQWdCO0FBQ2Y7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7O3lEQUFtQjtBQUNsQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7NERBQXNCO0FBTnZDLHdEQWlCQyJ9