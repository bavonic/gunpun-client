import { Schema, type } from "@colyseus/schema";
import { TeamId } from "../../../GameTypes";
import { DateTimeUtils } from "../../../utils";
import { ArrayUtils } from "../../../utils/array.utils";
import { PlayerSkillId } from "../skills/skills.types";

export interface UserParams {
  id: string;
  userId: string;
  avatar: string;
  name: string;
  isHost?: boolean;
  data?: string;
  teamId: TeamId;
}

export class UserSchema extends Schema {
  @type("string") id: string;
  @type("string") userId: string;
  @type("string") name: string;
  @type("string") avatar: string;
  @type("number") joinAt: number;
  @type("boolean") isHost: boolean = false;
  @type("boolean") isReady: boolean = true;
  @type("boolean") isLoadedAssets: boolean = false;
  @type("boolean") isConnecting: boolean = true;
  @type("string") data?: string;
  @type('string') teamId: TeamId;
  skillIds: PlayerSkillId[] = [];

  constructor(initial: UserParams) {
    super();
    this.id = initial.id;
    this.isHost = typeof initial.isHost === 'boolean' ? initial.isHost : false;
    this.isReady = true;
    this.isLoadedAssets = false;
    this.isConnecting = true;
    this.data = initial.data;
    this.teamId = initial.teamId;
    this.userId = initial.userId;
    this.name = initial.name;
    this.avatar = initial.avatar;
    this.joinAt = DateTimeUtils.timeToSeconds();
    this.skillIds = [];
  }

  setSkills(skillIds: PlayerSkillId[]) {
    this.skillIds = ArrayUtils.removeDuplicate(skillIds.filter(v => Object.values(PlayerSkillId).includes(v)));
  }
}