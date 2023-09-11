import { StoreAction } from 'stores';
import { DataState } from 'types';
import { MapConfig } from 'modules/maps';

const defaultState: DataState<MapConfig[]> = { isFetching: true, data: [] }

export let SET_MAPS = 'SET_MAPS';

export const mapsReducer = (state = defaultState, action: StoreAction): DataState<MapConfig[]> => {
  const { type, data } = action;
  if (type === SET_MAPS) return { isFetching: false, data };
  return state;
}