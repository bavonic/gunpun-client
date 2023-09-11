import { TeamId } from "game-types";
import { WeaponVariant } from "./weapons/types";

export interface PlayerSchema {
  id: string,
  speed: number,
  name: string,
  variant: PlayerVariant;
  weaponVariant: WeaponVariant;
  x: number,
  y: number,
  size: number,
  controller: string,
  isFlip: boolean,
  isMoving: boolean,
  teamId: TeamId,
  rulerAngle: number,
  remainHp: number,
  totalHp: number,
  isInTurn: boolean,
  onChange?: (changes: any[]) => void;
  toJSON: () => any;
  skills: any;
  data?: string;
}

export enum PlayerVariant {
  DEFAULT = 'DEFAULT',
  PERSONAL_I = 'PERSONAL_I',
  ARCHER_I = 'ARCHER_I',
  BOMBER_I = 'BOMBER_I',
}

export enum PlayerEvent {
  CHANGE_POSITION = 'CHANGE_POSITION',
  UPDATE_HP = 'UPDATE_HP',
  UPDATE_SKILLS = 'UPDATE_SKILLS',
  MINUS_HP = 'MINUS_HP',
  IN_TURN = 'IN_TURN',
  STOP_TURN = 'STOP_TURN',

  //
  COLLIDER = 'COLLIDER',
  MOVING = 'MOVING',
  STOP_MOVE = 'STOP_MOVE'
}