import { Schema, type } from "@colyseus/schema";
import { PlayerSkill, PlayerSkillId } from "../skills/skills.types";

export class MatchPlayerSkillSchema extends Schema {
  @type("string") id: PlayerSkillId;
  @type("boolean") isActivated: boolean;
  @type("boolean") isPassive: boolean;
  @type("string") avatar: string;
  @type("number") lifeCycle: number;
  @type("number") recoveryTime: number;

  constructor(matchSkill: PlayerSkill) {
    super();
    this.id = matchSkill.id;
    this.recoveryTime = 0;
    this.avatar = matchSkill.avatar;
    this.lifeCycle = matchSkill.lifeCycle;
    this.isPassive = !!matchSkill.isPassive;
    this.isActivated = false;
  }
}