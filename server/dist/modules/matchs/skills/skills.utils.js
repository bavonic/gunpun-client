"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArcadePhysics = exports.originCornertoCenter = exports.originCenterToCorner = exports.getSkillInstance = exports.randomInt = void 0;
const arcade_physics_1 = require("arcade-physics");
const normal_skill_1 = require("./players/normal.skill");
const threeBullets_skill_1 = require("./players/threeBullets.skill");
const threeBulletsDelayTime_skill_1 = require("./players/threeBulletsDelayTime.skill");
const twoBulletsDelayTime_skill_1 = require("./players/twoBulletsDelayTime.skill");
const skills_types_1 = require("./skills.types");
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomInt = randomInt;
const getSkillInstance = (skillId) => {
    if (skillId === skills_types_1.PlayerSkillId.NORMAL)
        return normal_skill_1.normalSkill;
    // if (skillId === PlayerSkillId.TWO_BULLETS) return twoBulletsSkill;
    if (skillId === skills_types_1.PlayerSkillId.THREE_BULLETS)
        return threeBullets_skill_1.threeBulletsSkill;
    if (skillId === skills_types_1.PlayerSkillId.PLUS_ONE_BULLETS)
        return twoBulletsDelayTime_skill_1.twoBulletsDelayTimeSkill;
    if (skillId === skills_types_1.PlayerSkillId.PLUS_TWO_BULLETS)
        return threeBulletsDelayTime_skill_1.threeBulletsDelayTimeSkill;
    return normal_skill_1.normalSkill;
};
exports.getSkillInstance = getSkillInstance;
const originCenterToCorner = (stat) => {
    return {
        x: stat.x - stat.w / 2,
        y: stat.y - stat.h / 2,
        w: stat.w,
        h: stat.h,
    };
};
exports.originCenterToCorner = originCenterToCorner;
const originCornertoCenter = (stat) => {
    return {
        x: stat.x + stat.w / 2,
        y: stat.y + stat.h / 2,
        w: stat.w,
        h: stat.h,
    };
};
exports.originCornertoCenter = originCornertoCenter;
const getArcadePhysics = (params) => {
    const physics = new arcade_physics_1.ArcadePhysics({
        width: params.mapSize.w,
        height: params.mapSize.h,
        gravity: { x: 0, y: 500 }
    });
    physics.world.setBounds(0, 0, params.mapSize.w, params.mapSize.h, true, true, false, true);
    physics.world.setBoundsCollision(true, true, false, true);
    return physics;
};
exports.getArcadePhysics = getArcadePhysics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL3NraWxscy9za2lsbHMudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQStDO0FBQy9DLHlEQUFxRDtBQUNyRCxxRUFBaUU7QUFDakUsdUZBQW1GO0FBRW5GLG1GQUErRTtBQUMvRSxpREFBNEQ7QUFFNUQsU0FBZ0IsU0FBUyxDQUFDLEdBQVcsRUFBRSxHQUFXO0lBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0FBQzFELENBQUM7QUFGRCw4QkFFQztBQUVNLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxPQUFzQixFQUFFLEVBQUU7SUFDekQsSUFBSSxPQUFPLEtBQUssNEJBQWEsQ0FBQyxNQUFNO1FBQUUsT0FBTywwQkFBVyxDQUFDO0lBQ3pELHFFQUFxRTtJQUNyRSxJQUFJLE9BQU8sS0FBSyw0QkFBYSxDQUFDLGFBQWE7UUFBRSxPQUFPLHNDQUFpQixDQUFDO0lBQ3RFLElBQUksT0FBTyxLQUFLLDRCQUFhLENBQUMsZ0JBQWdCO1FBQUUsT0FBTyxvREFBd0IsQ0FBQztJQUNoRixJQUFJLE9BQU8sS0FBSyw0QkFBYSxDQUFDLGdCQUFnQjtRQUFFLE9BQU8sd0RBQTBCLENBQUM7SUFDbEYsT0FBTywwQkFBVyxDQUFDO0FBQ3JCLENBQUMsQ0FBQTtBQVBZLFFBQUEsZ0JBQWdCLG9CQU81QjtBQUVNLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxJQUFvRCxFQUFFLEVBQUU7SUFDM0YsT0FBTztRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ1YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQVBZLFFBQUEsb0JBQW9CLHdCQU9oQztBQUVNLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxJQUFvRCxFQUFFLEVBQUU7SUFDM0YsT0FBTztRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ1YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQVBZLFFBQUEsb0JBQW9CLHdCQU9oQztBQUVNLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUFtQixFQUFFLEVBQUU7SUFDdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBYSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7S0FDMUIsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRixPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTFELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMsQ0FBQTtBQVhZLFFBQUEsZ0JBQWdCLG9CQVc1QiJ9