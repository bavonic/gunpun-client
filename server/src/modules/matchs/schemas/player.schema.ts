import { MapSchema, type } from "@colyseus/schema";
import { TeamId } from "../../../GameTypes";
import { WeaponVariant } from "../../weapons/types";
import type { MatchRoom } from '../matchs.room';
import { GameEvent } from "../matchs.types";
import { playerSkills } from "../skills/skills.data";
import { SkillModule } from "../skills/skills.module";
import { PerformPlayerSkillParams, PlayerSkillId, SkillParams, SkillServerProcessResponse } from "../skills/skills.types";
import { getSkillInstance } from "../skills/skills.utils";
import { GameObjectParams, GameObjectSchema } from "./game-object.schema";
import { MatchPlayerSkillSchema } from "./skill.schema";

export interface PlayerParams extends GameObjectParams {
  name: string;
  variant?: PlayerVariant;
  weaponVariant?: WeaponVariant;
  controller: string;
  teamId: TeamId;
  totalHp: number;
  speed: number;
  size: number;
  isFlip?: boolean;
  skillIds?: PlayerSkillId[];
  data?: string;
}

export enum PlayerVariant {
  DEFAULT = 'DEFAULT',
  PERSONAL_I = 'PERSONAL_I',
  ARCHER_I = 'ARCHER_I',
  BOMBER_I = 'BOMBER_I',
}

export class PlayerSchema extends GameObjectSchema {
  @type("string") controller: string;
  @type("string") variant: PlayerVariant;
  @type("string") weaponVariant: WeaponVariant;
  @type("string") name: string;
  @type("string") teamId: TeamId;
  @type("number") totalHp: number;
  @type("number") size: number;
  @type("number") remainHp: number;
  @type("number") speed: number;
  @type("number") rulerAngle: number;
  @type("boolean") isMoving: boolean = false;
  @type("boolean") isFlip: boolean = false;
  @type("boolean") isInTurn: boolean = false;
  @type("string") data?: string;
  @type({ map: MatchPlayerSkillSchema }) skills = new MapSchema<MatchPlayerSkillSchema>();
  activeSkillId: PlayerSkillId = undefined;

  constructor(initial: PlayerParams) {
    super(initial);
    this.variant = initial.variant || PlayerVariant.DEFAULT;
    this.weaponVariant = initial.weaponVariant || WeaponVariant.DEFAULT;
    this.controller = initial.controller;
    this.teamId = initial.teamId;
    this.totalHp = initial.totalHp;
    this.remainHp = initial.totalHp;
    this.speed = initial.speed;
    this.size = initial.size;
    this.rulerAngle = 35;
    this.isFlip = !!initial.isFlip;
    this.name = initial.name;
    this.data = initial.data;

    if (initial.skillIds) initial.skillIds.map((skillId) => {
      const playerSkill = playerSkills.find(v => v.id === skillId);
      if (!playerSkill) return;
      const skill = new MatchPlayerSkillSchema(playerSkill);
      this.skills.set(skillId, skill);
    })
  }

  minusHp(damage: number) {
    const remainHp = this.remainHp - damage;
    if (remainHp <= 0) this.remainHp = 0;
    else this.remainHp = remainHp;
  }

  useSkill(params: { skillId: PlayerSkillId, matchRoom: MatchRoom }) {
    const { skillId, matchRoom } = params;
    const skill = this.skills.get(skillId);
    if (!skill || !this.isInTurn || skill.recoveryTime > 0) return;

    if (skill.isPassive) {
      // // ======================= Passive skill =======================
      if (skill.recoveryTime > 0) return;

      if (skillId === PlayerSkillId.P_RECOVER_200HP) {
        let newHp = this.remainHp + 200;
        if (newHp > this.totalHp) newHp = this.totalHp;
        this.remainHp = newHp;
      }

      if (skillId === PlayerSkillId.P_PLUS_30_DAMAGE) {
        skill.isActivated = true;
      }

      if (skillId === PlayerSkillId.P_PLUS_50_DAMAGE) {
        skill.isActivated = true;
      }

      skill.recoveryTime = skill.lifeCycle;
      matchRoom.broadcast(GameEvent.SERVER_PLAYER_USE_SKILL, { skillId, playerId: this.id });
    } else {
      // ======================= Active skill =======================
      if (this.activeSkillId) return;
      this.activeSkillId = skillId;
      skill.isActivated = true;
      matchRoom.broadcast(GameEvent.SERVER_PLAYER_USE_SKILL, { skillId, playerId: this.id });
    }
  }

  getCurrentActiveSkill() {
    let skill: MatchPlayerSkillSchema = undefined;
    this.skills.forEach(s => {
      if (s.isActivated && !s.isPassive) skill = s;
    })

    return skill;
  }

  getCurrentPassiveSkills() {
    let skills: MatchPlayerSkillSchema[] = [];
    this.skills.forEach(s => {
      if (s.isActivated && s.isPassive) skills.push(s);
    })

    return skills;
  }

  getSkillParms(params: { matchRoom: MatchRoom, strengthPercent: number, targets: PlayerSchema[], dataPixel: any[] }) {
    const { matchRoom, strengthPercent, targets, dataPixel } = params;

    let platforms: any[] = [];
    matchRoom.state.platforms.forEach((p) => {
      platforms.push(p);
    });

    const maxStrength = 2500;
    const strength = maxStrength * (strengthPercent / 100);

    const skillParams: SkillParams = {
      mapSize: { w: matchRoom.mapConfig.width, h: matchRoom.mapConfig.height },
      angle: this.getAngle(),
      from: {
        id: this.id,
        size: this.size,
        x: this.x,
        y: this.y,
        teamId: this.teamId,
      },
      platforms: platforms.map(v => ({
        id: v.id,
        h: v.h,
        w: v.w,
        x: v.x,
        y: v.y,
      })),
      strength,
      targets: targets.map(v => ({
        id: v.id,
        x: v.x,
        y: v.y,
        size: v.size,
        teamId: v.teamId,
      })),
      dataPixel: dataPixel,
      environment: {
        windLevel: matchRoom.state.windLevel,
        windDirection: matchRoom.state.winDirection,
      }
    }

    return skillParams;
  }

  async performSkill(params: {
    matchRoom: MatchRoom,
    strengthPercent: number,
    dataPixel: any[]
    onSkillCheckingResult?: (result: SkillServerProcessResponse) => void,
  }) {
    if (!this.isInTurn) return;

    const { matchRoom, strengthPercent, dataPixel } = params;
    const activeSkill = this.getCurrentActiveSkill();
    const skillId = activeSkill ? activeSkill.id : PlayerSkillId.NORMAL;

    // Xác định mục tiêu
    let targets: PlayerSchema[] = [];
    params.matchRoom.state.players.forEach((player) => {
      if (player.teamId !== this.teamId && player.remainHp > 0) targets.push(player);
    })

    const skillParams: SkillParams = this.getSkillParms({ matchRoom, strengthPercent, targets, dataPixel });
    const skillInstance = getSkillInstance(skillId);

    const skillCheckingResult = await skillInstance.serverProcess({
      params: skillParams,
      deltaTime: 10,
      getDamage: ({ targetId }) => {
        const target = targets.find(v => v.id === targetId);
        if (!target) return 0;
        return SkillModule.getDamage({ player: this, target, skillId, params: skillParams });
      }
    });

    if (params.onSkillCheckingResult) params.onSkillCheckingResult(skillCheckingResult)

    const performSkillParams: PerformPlayerSkillParams = {
      ...skillCheckingResult,
      from: skillParams.from,
      skillId,
      angle: skillParams.angle,
      strength: skillParams.strength,
    }
    // console.log("\n\n>>>> START DEBUG SKILL");
    // console.log("Turn time ", params.matchRoom.state.turnTime);
    // console.log("Skill ", params.skillId);
    // console.log(`Total Damage Logic: ${skillCheckingResult.playerEffecteds.reduce((a, b) => a + b.damage, 0)}`);
    // console.log("HP Before ", `${target[0]?.remainHp}/${target[0]?.totalHp}`);

    let userCompletedCount = 0;
    await new Promise((resolve) => {
      const listener = matchRoom.emitter.on(GameEvent.USER_PERFORM_PLAYER_TURN_COMPLETED, ({ client }) => {
        const user = matchRoom.getUser(client);
        if (!user) return;
        userCompletedCount += 1;

        if (userCompletedCount === matchRoom.state.users.size) {
          // Minus HP
          let totalPlayerEffects: { [playerId: string]: number } = {};
          skillCheckingResult.playerEffecteds.map(({ id, damage }) => {
            totalPlayerEffects[id] = (totalPlayerEffects[id] || 0) + damage;
          })

          Object.keys(totalPlayerEffects).map((id) => {
            const player = matchRoom.state.players.get(id);
            if (!player) return;
            player.minusHp(totalPlayerEffects[id]);
          })

          const skill = this.skills.get(skillId);
          if (skill) skill.recoveryTime = skill.lifeCycle

          // console.log("HP After ", `${target[0]?.remainHp}/${target[0]?.totalHp}`);
          // console.log(">>>> END DEBUG SKILL\n\n");
          listener.destroy();
          resolve(true);
        }
      });

      matchRoom.broadcast(GameEvent.SERVER_PERFORM_PLAYER_TURN, performSkillParams);
    })
  }

  recoverSkills() {
    this.activeSkillId = undefined;
    this.skills.forEach((skill) => {
      skill.isActivated = false;
      if (skill.recoveryTime > 0) skill.recoveryTime -= 1;
    })
  }

  getAngle() {
    if (this.isFlip) return 180 + this.rulerAngle;
    return -this.rulerAngle;
  }

  increaseRulerAngle() {
    if (this.rulerAngle >= 120) return;
    this.rulerAngle += 1;
  }

  decreaseRulerAngle() {
    if (this.rulerAngle <= 30) return;
    this.rulerAngle -= 1;
  }

  move(params: { x: number, y: number, isFlip: boolean }) {
    if (!this.isInTurn) return;
    this.x = params.x;
    this.y = params.y;
    this.isFlip = params.isFlip;
    this.isMoving = true;
  }

  stopMove() {
    if (!this.isInTurn) return;
    this.isMoving = false;
  }
}