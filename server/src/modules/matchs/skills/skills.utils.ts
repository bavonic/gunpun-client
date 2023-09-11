import { ArcadePhysics } from 'arcade-physics';
import { normalSkill } from "./players/normal.skill";
import { threeBulletsSkill } from "./players/threeBullets.skill";
import { threeBulletsDelayTimeSkill } from './players/threeBulletsDelayTime.skill';
import { twoBulletsSkill } from "./players/twoBullets.skill";
import { twoBulletsDelayTimeSkill } from './players/twoBulletsDelayTime.skill';
import { PlayerSkillId, SkillParams } from "./skills.types";

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getSkillInstance = (skillId: PlayerSkillId) => {
  if (skillId === PlayerSkillId.NORMAL) return normalSkill;
  // if (skillId === PlayerSkillId.TWO_BULLETS) return twoBulletsSkill;
  if (skillId === PlayerSkillId.THREE_BULLETS) return threeBulletsSkill;
  if (skillId === PlayerSkillId.PLUS_ONE_BULLETS) return twoBulletsDelayTimeSkill;
  if (skillId === PlayerSkillId.PLUS_TWO_BULLETS) return threeBulletsDelayTimeSkill;
  return normalSkill;
}

export const originCenterToCorner = (stat: { x: number, y: number, w: number, h: number }) => {
  return {
    x: stat.x - stat.w / 2,
    y: stat.y - stat.h / 2,
    w: stat.w,
    h: stat.h,
  }
}

export const originCornertoCenter = (stat: { x: number, y: number, w: number, h: number }) => {
  return {
    x: stat.x + stat.w / 2,
    y: stat.y + stat.h / 2,
    w: stat.w,
    h: stat.h,
  }
}

export const getArcadePhysics = (params: SkillParams) => {
  const physics = new ArcadePhysics({
    width: params.mapSize.w,
    height: params.mapSize.h,
    gravity: { x: 0, y: 500 }
  });

  physics.world.setBounds(0, 0, params.mapSize.w, params.mapSize.h, true, true, false, true);
  physics.world.setBoundsCollision(true, true, false, true);

  return physics
}