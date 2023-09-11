import { SkillInstance } from '../skills.types';
import { renderMutilBulletsSkillInstance } from './mutilBullets.skill';

export const threeBulletsSkill: SkillInstance = renderMutilBulletsSkillInstance({ numberOfBullet: 3 });