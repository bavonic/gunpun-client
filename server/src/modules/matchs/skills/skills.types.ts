import { ArcadePhysics } from 'arcade-physics';
import { GameObjectStat, MapScene, PlayerStat, WindDirection } from "../../../GameTypes";
import { PlayerSchema } from '../schemas/player.schema';

// ======================= Start Player Skills =======================
export enum PlayerSkillId {
  NORMAL = 'NORMAL',
  THREE_BULLETS = 'THREE_BULLETS',
  PLUS_ONE_BULLETS = 'PLUS_ONE_BULLETS',
  PLUS_TWO_BULLETS = 'PLUS_TWO_BULLETS',
  P_PLUS_30_DAMAGE = 'P_PLUS_30_DAMAGE',
  P_PLUS_50_DAMAGE = 'P_PLUS_50_DAMAGE',
  P_RECOVER_200HP = 'P_RECOVER_200HP',
}

export interface PlayerSkill {
  id: PlayerSkillId,
  avatar: string,
  lifeCycle: number,
  isPassive?: boolean,
}

export interface MatchPlayerSkill extends PlayerSkill {
  recoveryTime: number,
  isActivated: boolean,
}

export interface PlayerShotPayload {
  strengthPercent: number,
  dataPixel: any[]
}

export interface SkillParams {
  mapSize: { w: number, h: number },
  from: PlayerStat,
  targets: PlayerStat[],
  platforms: GameObjectStat[],
  strength: number,
  angle: number,
  dataPixel: any[],
  environment: {
    windLevel: number,
    windDirection: WindDirection,
  }
}

export interface PlayerEffected {
  id: string,
  damage: number,
  [field: string]: any,
}

export interface SkillServerProcessResponse { playerEffecteds: PlayerEffected[] };

export type SkillServerProcess = (input: {
  params: SkillParams,
  deltaTime: number,
  getDamage: (params: { targetId: string }) => number,
  onUpdate?: (physics: ArcadePhysics) => void,
}) => Promise<SkillServerProcessResponse>;

export type SkillClientProcess = (params: PerformPlayerSkillParams, scene: MapScene) => Promise<any>;

export interface SkillInstance {
  serverProcess: SkillServerProcess,
  preload?: () => void,
}

export interface PerformPlayerSkillParams extends SkillServerProcessResponse {
  skillId: PlayerSkillId,
  from: PlayerStat,
  angle: number,
  strength: number,
}

export interface PerformNpcSkillParams {
  from: PlayerStat,
  skillId: NpcSkillId,
  playerEffecteds: PlayerEffected[]
}

export enum NpcSkillId {
  NORMAL = 'NORMAL',
}

export interface CalculateDamagePayload {
  player: PlayerSchema,
  target: PlayerSchema,
  skillId: PlayerSkillId,
  params: SkillParams,
}