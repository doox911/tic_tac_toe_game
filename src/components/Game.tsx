/**
 * React
 */
import * as React from 'react'

/**
 * Common
 */
import { findWinner, generateSquares, createGameHistory } from '../common/index'

/**
 * Components
 */
import Board from './Board'
import Welcome from './Welcome'

/**
 * Store
 */
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  getIsGameOver,
  setGameOver,
  setWinnerSquares,
  getGameStatus,
  addStep,
  getStep,
} from '../store/game'

/**
 * Types
 */
import type { RenderSquare } from './Square'

const squares: RenderSquare[] = generateSquares()

const win_sound = new Audio('static/audio/mixkit-instant-win-2021.wav');

const click_sound = new Audio('static/audio/mixkit-plastic-bubble-click-1124.wav');

function Game() {

  /**
   * Состояние компонента Game
   */
  const [next, setNext] = React.useState<boolean>(true)

  const [history, setHistory] = React.useState<GameHistory>(createGameHistory())

  /**
   * Redux 
   */
  // const step = useAppSelector(getStep)

  const status = useAppSelector(getGameStatus)

  const is_game_over = useAppSelector(getIsGameOver)

  const dispatch = useAppDispatch();

  function onClickHandler(square: RenderSquare) {
    if (!is_game_over && !square.freeze) {
      click_sound.play();

      dispatch(addStep())

      square.freeze = true
      square.value = next ? 1 : 0

      history[square.position.y][square.position.x] = square

      setHistory([...history])

      const winner = findWinner(history, square)

      if (winner.win) {
        win_sound.play()
        dispatch(setWinnerSquares(winner.squares))
      }

      dispatch(setGameOver(winner.win))

      setNext(!next)
    }
  }

  return (
    <div className="game container max-w-2xl mx-auto">
      {status === 1 && <Welcome />}
      {status === 2 &&
        <Board
          squares={squares}
          onClick={onClickHandler}
        />
      }
    </div>
  );
}

export type GameHistory = (RenderSquare | null)[]

/**
 * 1 - Игра не началась
 * 2 - Идёт игра
 * 3 - Игра окончена
 */
export type GameStatus = 1 | 2 | 3

export default Game