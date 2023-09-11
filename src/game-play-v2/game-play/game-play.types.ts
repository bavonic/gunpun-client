import { TeamId } from "game-types";
import { RoomAvailable } from "colyseus.js";
import { MapConfig } from "modules/maps";

export type CreateMatchRoom = (payload: CreateMatchRoomPayload) => Promise<any>;

export interface CreateMatchRoomPayload {
  mapId: string,
  loadBackground?: string,
  params?: any,
}

export interface GamePlayContext {
  createMatchRoom: CreateMatchRoom,
  startMatchRoom: () => Promise<any>,
  leaveMatchRoom: () => Promise<any>,
  joinMatchRoom: (roomId: string, params?: any) => Promise<any>,
}

export type AssetType = 'image' | 'sound' | 'atlas';

export interface Asset {
  key: string,
  url: string,
  type: AssetType,
}

export interface AssetAtlas {
  key: string,
  url: string,
}

export interface RoomMetadata {
  createdAt: number,
  hostName: string,
  hostAvatar: string,
  mapConfig: MapConfig,
  roomName?: string,
  mode?: string
}

export interface GameUser {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isReady: boolean;
  isPerforming: boolean;
  isLoadedAssets: boolean;
  isConnecting: boolean;
  joinAt: number;
  data: string;
  teamId: TeamId;
}

export type MatchRoom = RoomAvailable<RoomMetadata>

export enum GameEvent {
  // ======================= Users (Monitors) =======================
  // User request
  USER_START = 'USER_START',
  USER_READY = 'USER_READY',
  USER_CHANGE_TEAM = 'USER_CHANGE_TEAM',
  USER_SELECT_SKILLS = 'USER_SELECT_SKILLS',

  // User control
  USER_PLAYER_INCREASE_RULER_ANGLE = 'USER_PLAYER_INCREASE_RULER_ANGLE',
  USER_PLAYER_DECREASE_RULER_ANGLE = 'USER_PLAYER_DECREASE_RULER_ANGLE',
  USER_PLAYER_SHOT = 'USER_PLAYER_SHOT',
  USER_PLAYER_MOVE = 'USER_PLAYER_MOVE',
  USER_PLAYER_STOP_MOVE = 'USER_PLAYER_STOP_MOVE',
  USER_PLAYER_USE_SKILL = 'USER_PLAYER_USE_SKILL',

  // For test
  USER_TEST_PLAYER_GET_SKILL_PARAMS = 'USER_TEST_PLAYER_GET_SKILL_PARAMS',
  USER_TEST_PLAYER_PERFORM_SKILL = 'USER_TEST_PLAYER_PERFORM_SKILL',

  // Reponse to server
  USER_PRELOAD_ASSETS_COMPLETED = 'USER_PRELOAD_ASSETS_COMPLETED',
  USER_PERFORM_INTRO_COMPLETED = 'USER_PERFORM_INTRO_COMPLETED',
  USER_PERFORM_PLAYER_TURN_COMPLETED = 'USER_PERFORM_PLAYER_TURN_COMPLETED',
  USER_PERFORM_NPC_TURN_COMPLETED = 'USER_PERFORM_NPC_TURN_COMPLETED',

  // ======================= Server =======================
  SERVER_INITIALIZE_MATCH = 'SERVER_INITIALIZE_MATCH',
  SERVER_PRELOAD_ASSETS = 'SERVER_PRELOAD_ASSETS',
  SERVER_PERFORM_INTRO = 'SERVER_PERFORM_INTRO',
  SERVER_PLAYER_TURN = 'SERVER_PLAYER_TURN',
  SERVER_PLAYER_TURN_TIMEOUT = 'SERVER_PLAYER_TURN_TIMEOUT',
  SERVER_PERFORM_PLAYER_TURN = 'SERVER_PERFORM_PLAYER_TURN',
  SERVER_PERFORM_NPC_TURN = 'SERVER_PERFORM_NPC_TURN',
  SERVER_MATCH_FINISHED = 'SERVER_MATCH_FINISHED',
  SERVER_UPDATE_USERS = 'SERVER_UPDATE_USERS',
  SERVER_PLAYER_USE_SKILL = 'SERVER_PLAYER_USE_SKILL',
  SERVER_START_USERS_PREPARING = 'SERVER_START_USERS_PREPARING',

  // For test
  SERVER_TEST_SKILL_CHECKING_RESULT = 'SERVER_TEST_SKILL_CHECKING_RESULT',
  SERVER_TEST_PLAYER_RESPONSE_SKILL_PARAMS = 'SERVER_TEST_PLAYER_RESPONSE_SKILL_PARAMS',
  //Join waiting room
  JOIN_WAITING_ROOM = 'JOIN_WAITING_ROOM',
  OUT_WAITING_ROOM = 'OUT_WAITING_ROOM',
  HOST_WAITING_ROOM = 'HOST_WAITING_ROOM'
}

export enum LobbyEvent {
  CREATE_ROOM = 'CREATE_ROOM',
  MAP_GAME = 'MAP_GAME',
}