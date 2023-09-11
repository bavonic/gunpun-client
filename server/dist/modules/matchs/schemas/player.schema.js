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
exports.PlayerSchema = exports.PlayerVariant = void 0;
const schema_1 = require("@colyseus/schema");
const types_1 = require("../../weapons/types");
const matchs_types_1 = require("../matchs.types");
const skills_data_1 = require("../skills/skills.data");
const skills_module_1 = require("../skills/skills.module");
const skills_types_1 = require("../skills/skills.types");
const skills_utils_1 = require("../skills/skills.utils");
const game_object_schema_1 = require("./game-object.schema");
const skill_schema_1 = require("./skill.schema");
var PlayerVariant;
(function (PlayerVariant) {
    PlayerVariant["DEFAULT"] = "DEFAULT";
    PlayerVariant["PERSONAL_I"] = "PERSONAL_I";
    PlayerVariant["ARCHER_I"] = "ARCHER_I";
    PlayerVariant["BOMBER_I"] = "BOMBER_I";
})(PlayerVariant = exports.PlayerVariant || (exports.PlayerVariant = {}));
class PlayerSchema extends game_object_schema_1.GameObjectSchema {
    constructor(initial) {
        super(initial);
        this.isMoving = false;
        this.isFlip = false;
        this.isInTurn = false;
        this.skills = new schema_1.MapSchema();
        this.activeSkillId = undefined;
        this.variant = initial.variant || PlayerVariant.DEFAULT;
        this.weaponVariant = initial.weaponVariant || types_1.WeaponVariant.DEFAULT;
        this.controller = initial.controller;
        this.teamId = initial.teamId;
        this.totalHp = initial.totalHp;
        this.remainHp = initial.totalHp;
        this.speed = initial.speed;
        this.size = initial.size;
        this.rulerAngle = 35;
        this.isFlip = !!initial.isFlip;
        this.name = initial.name;
        this.data = initial.data;
        if (initial.skillIds)
            initial.skillIds.map((skillId) => {
                const playerSkill = skills_data_1.playerSkills.find(v => v.id === skillId);
                if (!playerSkill)
                    return;
                const skill = new skill_schema_1.MatchPlayerSkillSchema(playerSkill);
                this.skills.set(skillId, skill);
            });
    }
    minusHp(damage) {
        const remainHp = this.remainHp - damage;
        if (remainHp <= 0)
            this.remainHp = 0;
        else
            this.remainHp = remainHp;
    }
    useSkill(params) {
        const { skillId, matchRoom } = params;
        const skill = this.skills.get(skillId);
        if (!skill || !this.isInTurn || skill.recoveryTime > 0)
            return;
        if (skill.isPassive) {
            // // ======================= Passive skill =======================
            if (skill.recoveryTime > 0)
                return;
            if (skillId === skills_types_1.PlayerSkillId.P_RECOVER_200HP) {
                let newHp = this.remainHp + 200;
                if (newHp > this.totalHp)
                    newHp = this.totalHp;
                this.remainHp = newHp;
            }
            if (skillId === skills_types_1.PlayerSkillId.P_PLUS_30_DAMAGE) {
                skill.isActivated = true;
            }
            if (skillId === skills_types_1.PlayerSkillId.P_PLUS_50_DAMAGE) {
                skill.isActivated = true;
            }
            skill.recoveryTime = skill.lifeCycle;
            matchRoom.broadcast(matchs_types_1.GameEvent.SERVER_PLAYER_USE_SKILL, { skillId, playerId: this.id });
        }
        else {
            // ======================= Active skill =======================
            if (this.activeSkillId)
                return;
            this.activeSkillId = skillId;
            skill.isActivated = true;
            matchRoom.broadcast(matchs_types_1.GameEvent.SERVER_PLAYER_USE_SKILL, { skillId, playerId: this.id });
        }
    }
    getCurrentActiveSkill() {
        let skill = undefined;
        this.skills.forEach(s => {
            if (s.isActivated && !s.isPassive)
                skill = s;
        });
        return skill;
    }
    getCurrentPassiveSkills() {
        let skills = [];
        this.skills.forEach(s => {
            if (s.isActivated && s.isPassive)
                skills.push(s);
        });
        return skills;
    }
    getSkillParms(params) {
        const { matchRoom, strengthPercent, targets, dataPixel } = params;
        let platforms = [];
        matchRoom.state.platforms.forEach((p) => {
            platforms.push(p);
        });
        const maxStrength = 2500;
        const strength = maxStrength * (strengthPercent / 100);
        const skillParams = {
            mapSize: { w: matchRoom.mapConfig.width, h: matchRoom.mapConfig.height },
            angle: this.getAngle(),
            from: {
                id: this.id,
                size: this.size,
                x: this.x,
                y: this.y,
                teamId: this.teamId,
            },
            platforms: platforms.map(v => ({
                id: v.id,
                h: v.h,
                w: v.w,
                x: v.x,
                y: v.y,
            })),
            strength,
            targets: targets.map(v => ({
                id: v.id,
                x: v.x,
                y: v.y,
                size: v.size,
                teamId: v.teamId,
            })),
            dataPixel: dataPixel,
            environment: {
                windLevel: matchRoom.state.windLevel,
                windDirection: matchRoom.state.winDirection,
            }
        };
        return skillParams;
    }
    performSkill(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInTurn)
                return;
            const { matchRoom, strengthPercent, dataPixel } = params;
            const activeSkill = this.getCurrentActiveSkill();
            const skillId = activeSkill ? activeSkill.id : skills_types_1.PlayerSkillId.NORMAL;
            // Xác định mục tiêu
            let targets = [];
            params.matchRoom.state.players.forEach((player) => {
                if (player.teamId !== this.teamId && player.remainHp > 0)
                    targets.push(player);
            });
            const skillParams = this.getSkillParms({ matchRoom, strengthPercent, targets, dataPixel });
            const skillInstance = (0, skills_utils_1.getSkillInstance)(skillId);
            const skillCheckingResult = yield skillInstance.serverProcess({
                params: skillParams,
                deltaTime: 10,
                getDamage: ({ targetId }) => {
                    const target = targets.find(v => v.id === targetId);
                    if (!target)
                        return 0;
                    return skills_module_1.SkillModule.getDamage({ player: this, target, skillId, params: skillParams });
                }
            });
            if (params.onSkillCheckingResult)
                params.onSkillCheckingResult(skillCheckingResult);
            const performSkillParams = Object.assign(Object.assign({}, skillCheckingResult), { from: skillParams.from, skillId, angle: skillParams.angle, strength: skillParams.strength });
            // console.log("\n\n>>>> START DEBUG SKILL");
            // console.log("Turn time ", params.matchRoom.state.turnTime);
            // console.log("Skill ", params.skillId);
            // console.log(`Total Damage Logic: ${skillCheckingResult.playerEffecteds.reduce((a, b) => a + b.damage, 0)}`);
            // console.log("HP Before ", `${target[0]?.remainHp}/${target[0]?.totalHp}`);
            let userCompletedCount = 0;
            yield new Promise((resolve) => {
                const listener = matchRoom.emitter.on(matchs_types_1.GameEvent.USER_PERFORM_PLAYER_TURN_COMPLETED, ({ client }) => {
                    const user = matchRoom.getUser(client);
                    if (!user)
                        return;
                    userCompletedCount += 1;
                    if (userCompletedCount === matchRoom.state.users.size) {
                        // Minus HP
                        let totalPlayerEffects = {};
                        skillCheckingResult.playerEffecteds.map(({ id, damage }) => {
                            totalPlayerEffects[id] = (totalPlayerEffects[id] || 0) + damage;
                        });
                        Object.keys(totalPlayerEffects).map((id) => {
                            const player = matchRoom.state.players.get(id);
                            if (!player)
                                return;
                            player.minusHp(totalPlayerEffects[id]);
                        });
                        const skill = this.skills.get(skillId);
                        if (skill)
                            skill.recoveryTime = skill.lifeCycle;
                        // console.log("HP After ", `${target[0]?.remainHp}/${target[0]?.totalHp}`);
                        // console.log(">>>> END DEBUG SKILL\n\n");
                        listener.destroy();
                        resolve(true);
                    }
                });
                matchRoom.broadcast(matchs_types_1.GameEvent.SERVER_PERFORM_PLAYER_TURN, performSkillParams);
            });
        });
    }
    recoverSkills() {
        this.activeSkillId = undefined;
        this.skills.forEach((skill) => {
            skill.isActivated = false;
            if (skill.recoveryTime > 0)
                skill.recoveryTime -= 1;
        });
    }
    getAngle() {
        if (this.isFlip)
            return 180 + this.rulerAngle;
        return -this.rulerAngle;
    }
    increaseRulerAngle() {
        if (this.rulerAngle >= 120)
            return;
        this.rulerAngle += 1;
    }
    decreaseRulerAngle() {
        if (this.rulerAngle <= 30)
            return;
        this.rulerAngle -= 1;
    }
    move(params) {
        if (!this.isInTurn)
            return;
        this.x = params.x;
        this.y = params.y;
        this.isFlip = params.isFlip;
        this.isMoving = true;
    }
    stopMove() {
        if (!this.isInTurn)
            return;
        this.isMoving = false;
    }
}
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], PlayerSchema.prototype, "controller", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], PlayerSchema.prototype, "variant", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], PlayerSchema.prototype, "weaponVariant", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], PlayerSchema.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], PlayerSchema.prototype, "teamId", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], PlayerSchema.prototype, "totalHp", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], PlayerSchema.prototype, "size", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], PlayerSchema.prototype, "remainHp", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], PlayerSchema.prototype, "speed", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], PlayerSchema.prototype, "rulerAngle", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], PlayerSchema.prototype, "isMoving", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], PlayerSchema.prototype, "isFlip", void 0);
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], PlayerSchema.prototype, "isInTurn", void 0);
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], PlayerSchema.prototype, "data", void 0);
__decorate([
    (0, schema_1.type)({ map: skill_schema_1.MatchPlayerSkillSchema }),
    __metadata("design:type", Object)
], PlayerSchema.prototype, "skills", void 0);
exports.PlayerSchema = PlayerSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLnNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL21hdGNocy9zY2hlbWFzL3BsYXllci5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1EO0FBRW5ELCtDQUFvRDtBQUVwRCxrREFBNEM7QUFDNUMsdURBQXFEO0FBQ3JELDJEQUFzRDtBQUN0RCx5REFBMEg7QUFDMUgseURBQTBEO0FBQzFELDZEQUEwRTtBQUMxRSxpREFBd0Q7QUFnQnhELElBQVksYUFLWDtBQUxELFdBQVksYUFBYTtJQUN2QixvQ0FBbUIsQ0FBQTtJQUNuQiwwQ0FBeUIsQ0FBQTtJQUN6QixzQ0FBcUIsQ0FBQTtJQUNyQixzQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBTFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFLeEI7QUFFRCxNQUFhLFlBQWEsU0FBUSxxQ0FBZ0I7SUFrQmhELFlBQVksT0FBcUI7UUFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBUkEsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFSixXQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUEwQixDQUFDO1FBQ3hGLGtCQUFhLEdBQWtCLFNBQVMsQ0FBQztRQUl2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUkscUJBQWEsQ0FBQyxPQUFPLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FB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