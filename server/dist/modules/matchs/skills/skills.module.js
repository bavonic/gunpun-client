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
exports.SkillModule = void 0;
const skills_data_1 = require("./skills.data");
const skills_types_1 = require("./skills.types");
const skills_utils_1 = require("./skills.utils");
class SkillModule {
    static getPlayerSkills(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            // return playerSkills.filter(v => v.isPassive);
            return skills_data_1.playerSkills;
        });
    }
}
SkillModule.getDamage = (payload) => {
    const { skillId } = payload;
    let damage = (0, skills_utils_1.randomInt)(300, 320);
    const passiveSkills = payload.player.getCurrentPassiveSkills();
    passiveSkills.map((skill) => {
        if (skill.id === skills_types_1.PlayerSkillId.P_PLUS_30_DAMAGE) {
            damage = damage + Math.floor(damage * 0.3);
        }
        if (skill.id === skills_types_1.PlayerSkillId.P_PLUS_50_DAMAGE) {
            damage = damage + Math.floor(damage * 0.5);
        }
    });
    if ([skills_types_1.PlayerSkillId.THREE_BULLETS].includes(skillId)) {
        damage = Math.floor(damage / 3);
    }
    return damage;
};
exports.SkillModule = SkillModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL21hdGNocy9za2lsbHMvc2tpbGxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBNkM7QUFDN0MsaURBQXVFO0FBQ3ZFLGlEQUEyQztBQUUzQyxNQUFhLFdBQVc7SUFDdEIsTUFBTSxDQUFPLGVBQWUsQ0FBQyxRQUFnQjs7WUFDM0MsUUFBUTtZQUNSLGdEQUFnRDtZQUNoRCxPQUFPLDBCQUFZLENBQUM7UUFDdEIsQ0FBQztLQUFBOztBQUVNLHFCQUFTLEdBQUcsQ0FBQyxPQUErQixFQUFFLEVBQUU7SUFDckQsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUM1QixJQUFJLE1BQU0sR0FBRyxJQUFBLHdCQUFTLEVBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUMvRCxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDMUIsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLDRCQUFhLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0MsTUFBTSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztTQUM1QztRQUVELElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyw0QkFBYSxDQUFDLGdCQUFnQixFQUFFO1lBQy9DLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUE7U0FDM0M7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyw0QkFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNuRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDakM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUE7QUEzQlUsa0NBQVcifQ==