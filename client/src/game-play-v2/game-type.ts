import { PlayerSkillId } from "./game-play/skills/skills.types";

export const sizeScene = {
  width: 1920,
  height: 1080,
}

export const socialAuth = ['uni', 'meta'];


interface SkillAssets {
  id: PlayerSkillId,
  asset: string
}

export const skills: SkillAssets[] = [
  {
    id: PlayerSkillId.P_PLUS_50_DAMAGE,
    asset: `/images/player-skills/${PlayerSkillId.P_PLUS_50_DAMAGE.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.P_PLUS_30_DAMAGE,
    asset: `/images/player-skills/${PlayerSkillId.P_PLUS_30_DAMAGE.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.P_RECOVER_200HP,
    asset: `/images/player-skills/${PlayerSkillId.P_RECOVER_200HP.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.PLUS_ONE_BULLETS,
    asset: `/images/player-skills/${PlayerSkillId.PLUS_ONE_BULLETS.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.PLUS_TWO_BULLETS,
    asset: `/images/player-skills/${PlayerSkillId.PLUS_TWO_BULLETS.toLowerCase()}.png`,
  },
  // {
  //   id: PlayerSkillId.TWO_BULLETS,
  //   asset: `/images/player-skills/${PlayerSkillId.TWO_BULLETS.toLowerCase()}.png`,
  // },
  {
    id: PlayerSkillId.THREE_BULLETS,
    asset: `/images/player-skills/${PlayerSkillId.THREE_BULLETS.toLowerCase()}.png`,
  }
]
