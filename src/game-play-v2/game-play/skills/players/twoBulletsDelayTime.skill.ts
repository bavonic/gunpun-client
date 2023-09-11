import { SkillInstance } from '../skills.types';
import { renderMutilBulletsDelayTimeSkillInstance } from './mutilBulletsDelayTime.skill';

export const twoBulletsDelayTimeSkill: SkillInstance = renderMutilBulletsDelayTimeSkillInstance({ numberOfBullet: 2, delay: 500 });