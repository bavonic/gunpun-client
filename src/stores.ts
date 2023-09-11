import { configureStore, combineReducers, Store } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

import { deviceReducer, gameStateReducer, mapsReducer, } from 'reducers';

const rootReducer = combineReducers({
  maps: mapsReducer,
  device: deviceReducer,
  gameState: gameStateReducer,
})

export const store: Store = configureStore({
  reducer: rootReducer,
});

export type StoreState = ReturnType<typeof rootReducer>
export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector

export type StoreAction = {
  type: string,
  [name: string]: any
}
