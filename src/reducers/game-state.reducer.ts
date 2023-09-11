import { StoreAction } from 'stores';

export interface gameState {
  inLobby: boolean,
  inChallenge: boolean,
  inHost: boolean,
}

const defaultState: gameState = {
  inLobby: true,
  inChallenge: false,
  inHost: false,
}

export const JOIN_CHALLENGE = 'JOIN_CHALLENGE'
export const JOIN_HOST_ROOM = 'JOIN_HOST_ROOM'
export const RETURN_LOBBY = 'RETURN_LOBBY'

export const gameStateReducer = (state = defaultState, action: StoreAction): gameState => {
  const { type } = action;

  switch (type) {
    case RETURN_LOBBY:
      return {
        ...state,
        inLobby: true,
        inChallenge: false,
        inHost: false
      };

    case JOIN_CHALLENGE:
      return {
        ...state,
        inLobby: false,
        inChallenge: true,
        inHost: false
      };

    case JOIN_HOST_ROOM:
      return {
        ...state,
        inLobby: false,
        inChallenge: false,
        inHost: true
      };

    default:
      return state;
  }
}