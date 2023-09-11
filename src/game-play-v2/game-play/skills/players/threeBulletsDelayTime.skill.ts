import { SkillInstance } from '../skills.types';
import { renderMutilBulletsDelayTimeSkillInstance } from './mutilBulletsDelayTime.skill';

export const threeBulletsDelayTimeSkill: SkillInstance = renderMutilBulletsDelayTimeSkillInstance({ numberOfBullet: 3, delay: 500 });