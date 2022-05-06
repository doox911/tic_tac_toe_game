import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Constants
 */
 import type { GameStatus } from '../../constants/game'
 
/**
 * Types
 */
import type { RootState } from '../../store'
import type { RenderSquare } from '../../components/Square'


export type GameState = {

  /**
   * Победившая последовательность
   */
  winner_squares: RenderSquare[]

  status: GameStatus,

  step: number
}

const initialState: GameState = {
  winner_squares: [],
  status: 1,
  step: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setWinnerSquares: (state, action: PayloadAction<RenderSquare[]>) => {
      state.winner_squares = action.payload
    },
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload
    },
    addStep: state => {
      ++state.step
    },
    resetSteps: state => {
      state.step = 0
    },
  }
})

/**
 * Actions
 */
export const {
  addStep,
  resetSteps,
  setWinnerSquares,
  setGameStatus,
} = gameSlice.actions

/**
 * Getters
 */
export const getWinnerSquares = (state: RootState) => state.game.winner_squares

export const getGameStatus = (state: RootState) => state.game.status

export const getStep = (state: RootState) => state.game.step


/**
 * Reducer
 */
export default gameSlice.reducer