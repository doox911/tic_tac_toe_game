import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Types
 */
import type { RootState } from '../../store'
import type { RenderSquare } from '../../components/Square'
import type { GameStatus } from '../../components/Game'

export type GameState = {

  /**
   * Флаг завершения игры
   */
  is_game_over: boolean

  /**
   * Победившая последовательность
   */
  winner_squares: RenderSquare[]

  status: GameStatus,

  step: number
}

const initialState: GameState = {
  is_game_over: false,
  winner_squares: [],
  status: 1,
  step: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameOver: state => {
      state.is_game_over = true
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.is_game_over = action.payload
    },
    setWinnerSquares: (state, action: PayloadAction<RenderSquare[]>) => {
      state.winner_squares = action.payload
    },
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload
    },
    addStep: state => {
      ++state.step
    } 
  }
})

/**
 * Actions
 */
export const {
  addStep,
  gameOver,
  setGameOver,
  setWinnerSquares,
  setGameStatus,
} = gameSlice.actions

/**
 * Getters
 */
export const getIsGameOver = (state: RootState) => state.game.is_game_over

export const getWinnerSquares = (state: RootState) => state.game.winner_squares

export const getGameStatus = (state: RootState) => state.game.status

export const getStep = (state: RootState) => state.game.step


/**
 * Reducer
 */
export default gameSlice.reducer