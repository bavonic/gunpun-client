import { playerSkills } from "./skills.data";
import { CalculateDamagePayload, PlayerSkillId } from "./skills.types";
import { randomInt } from "./skills.utils";

export class SkillModule {
  static async getPlayerSkills(playerId: string) {
    // TODO:
    // return playerSkills.filter(v => v.isPassive);
    return playerSkills;
  }

  static getDamage = (payload: CalculateDamagePayload) => {
    const { skillId } = payload;
    let damage = randomInt(300, 320);

    const passiveSkills = payload.player.getCurrentPassiveSkills();
    passiveSkills.map((skill) => {
      if (skill.id === PlayerSkillId.P_PLUS_30_DAMAGE) {
        damage = damage + Math.floor(damage * 0.3);
      }

      if (skill.id === PlayerSkillId.P_PLUS_50_DAMAGE) {
        damage = damage + Math.floor(damage * 0.5)
      }
    });

    if ([PlayerSkillId.THREE_BULLETS].includes(skillId)) {
      damage = Math.floor(damage / 3);
    }

    return damage;
  }
}