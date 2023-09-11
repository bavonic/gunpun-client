export interface MapConfig {
  id: string,
  name?: string,
  mode: MapMode,
  width: number,
  height: number,
  backgroundMode: MapBackgroundMode,
  assetUrl: string,
  numberOfPlayers: number,
  totalTime: number,
  totalTurnTime: number,
}



export enum MapMode {
  DEMO_PVE = 'DEMO_PVE',
  DEMO_PVP = 'DEMO_PVP',
  DEMO_SKILL = 'DEMO_SKILL',
}

export enum MapBackgroundMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

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

// Lobby Room
export enum MessageRoom {
  UPDATE_PLAYER,
  UPDATE_PLAYER_NAME,
  READY_TO_CONNECT,
  DISCONNECT_STREAM,
  CONNECT_TO_COMPUTER,
  DISCONNECT_FROM_COMPUTER,
  STOP_SCREEN_SHARE,
  CONNECT_TO_WHITEBOARD,
  DISCONNECT_FROM_WHITEBOARD,
  VIDEO_CONNECTED,
  ADD_CHAT_MESSAGE,
  SEND_ROOM_DATA,
}

export enum LobbyEvent {
  CREATE_ROOM = 'CREATE_ROOM',
  MAP_GAME = 'MAP_GAME',
}