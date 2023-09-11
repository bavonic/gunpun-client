import { PlayerSkill, PlayerSkillId } from "./skills.types";

export const playerSkills: PlayerSkill[] = [
  // {
  //   id: PlayerSkillId.TWO_BULLETS,
  //   avatar: `/images/player-skills/${PlayerSkillId.TWO_BULLETS.toLowerCase()}.png`,
  //   lifeCycle: 5,
  // },
  {
    id: PlayerSkillId.THREE_BULLETS,
    avatar: `/images/player-skills/${PlayerSkillId.THREE_BULLETS.toLowerCase()}.png`,
    lifeCycle: 10,
  },
  {
    id: PlayerSkillId.PLUS_ONE_BULLETS,
    avatar: `/images/player-skills/${PlayerSkillId.PLUS_ONE_BULLETS.toLowerCase()}.png`,
    lifeCycle: 15,
  },
  {
    id: PlayerSkillId.PLUS_TWO_BULLETS,
    avatar: `/images/player-skills/${PlayerSkillId.PLUS_TWO_BULLETS.toLowerCase()}.png`,
    lifeCycle: 20,
  },
  {
    id: PlayerSkillId.P_PLUS_30_DAMAGE,
    avatar: `/images/player-skills/${PlayerSkillId.P_PLUS_30_DAMAGE.toLowerCase()}.png`,
    lifeCycle: 20,
    isPassive: true,
  },
  {
    id: PlayerSkillId.P_PLUS_50_DAMAGE,
    avatar: `/images/player-skills/${PlayerSkillId.P_PLUS_50_DAMAGE.toLowerCase()}.png`,
    lifeCycle: 20,
    isPassive: true,
  },
  {
    id: PlayerSkillId.P_RECOVER_200HP,
    avatar: `/images/player-skills/${PlayerSkillId.P_RECOVER_200HP.toLowerCase()}.png`,
    lifeCycle: 20,
    isPassive: true,
  },
]