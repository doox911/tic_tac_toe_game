import { configureStore } from '@reduxjs/toolkit';

/**
 * Reducers
 */
import game from './game/index'

const store = configureStore({
  reducer: {
    game,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store