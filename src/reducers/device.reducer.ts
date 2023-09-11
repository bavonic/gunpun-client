import { StoreAction } from "stores";
import { Device } from "types";

const defaultState = {} as Device

export const SET_DEVICE = 'SET_DEVICE';

export const deviceReducer = (state = defaultState, action: StoreAction): Device => {
  const { type, data } = action;
  if (type === SET_DEVICE) return data;
  return state;
}