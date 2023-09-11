import { ArcadePhysics } from 'arcade-physics';
import { GameObjectStat, MapScene, PlayerStat, WindDirection } from "game-types";
import { PlayerSchema } from 'game-play-v2/game-play/players/player.types';

// ======================= Start Player Skills =======================
export enum PlayerSkillId {
  // NORMAL = 'NORMAL',
  // TWO_BULLETS = 'TWO_BULLETS',
  // TWO_BULLETS_DELAY_TIME = 'TWO_BULLETS_DELAY_TIME',
  // THREE_BULLETS = 'THREE_BULLETS',
  // THREE_BULLETS_DELAY_TIME = 'THREE_BULLETS_DELAY_TIME',
  // P_PLUS_100_DAMAGE = 'P_PLUS_100_DAMAGE',
  // P_PLUS_50_DAMAGE = 'P_PLUS_50_DAMAGE',
  // P_RECOVER_200HP = 'P_RECOVER_200HP',

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
  // scene: MapScene,
  deltaTime: number,
  getDamage: (params: { targetId: string }) => number,
  onUpdate?: (physics: ArcadePhysics) => void,
}) => Promise<SkillServerProcessResponse>;

export type SkillClientProcess = (params: PerformPlayerSkillParams, scene: MapScene) => Promise<any>;

export interface SkillInstance {
  serverProcess: SkillServerProcess,
  clientProcess: SkillClientProcess,
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