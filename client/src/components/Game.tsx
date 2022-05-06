/**
 * React
 */
import * as React from 'react'

/**
 * Common
 */
import {
  findWinner,
  createGameHistory,
  generateSquares,
  getLastStep,
  secondsToHHMMSS,
  getDiff,
} from '../common'

/**
 * Constants
 */
import { GameStatus } from '../constants/game'

/**
 * Components
 */
import Board from './Board'
import Welcome from './Welcome'
import Statistics from './Statistics'
import Controls from './controls/Controls'

/**
 * Store
 */
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  getGameStatus,
  setWinnerSquares,
  setGameStatus,
  addStep,
  resetSteps,
  getStep,
} from '../store/game'

/**
 * Socket
 */
import { io } from 'socket.io-client'

/**
 * Types
 */
import type { RenderSquare } from './Square'

const last_step = getLastStep()

const win_sound = new Audio('static/audio/win.wav');

const click_sound = new Audio('static/audio/click.wav');

let squares: RenderSquare[] = generateSquares()

let start_time = 0

let timer_id: number = 0

function Game() {

  /**
   * Состояние компонента Game
   */
  const [time, setTime] = React.useState<string>('00:00:00')

  const [next, setNext] = React.useState<boolean>(true)

  const [history, setHistory] = React.useState<GameHistory>(createGameHistory())

  /**
   * Redux 
   */
  const status = useAppSelector(getGameStatus)

  const step = useAppSelector(getStep)

  const dispatch = useAppDispatch();


  /**
   * Socket
   */
  const connect = () => {
    const socket = io('http://localhost:9000')
  };

  React.useEffect(() => {
    connect()
  }, [])

  function updateTime() {
    setTime(secondsToHHMMSS(getDiff(start_time)))

    timer_id = window.setTimeout(updateTime, 1000)
  }

  function onClickHandler(square: RenderSquare) {
    if (status !== GameStatus.GAME_OVER) {
      click_sound.play();

      dispatch(addStep())

      square.value = next ? 1 : 0

      history[square.position.y][square.position.x] = square

      setHistory([...history])

      const winner = findWinner(history, square)

      if (winner.win) {
        window.clearTimeout(timer_id)

        win_sound.play()

        dispatch(setGameStatus(GameStatus.GAME_OVER))
        dispatch(setWinnerSquares(winner.squares))
      }

      setNext(!next)
    }

    if (last_step === step) {
      window.clearTimeout(timer_id)

      dispatch(setGameStatus(GameStatus.GAME_OVER))
    }
  }

  function controlsOnClickHandler(event) {
    if (event.clicked === 'play') {
      start_time = (new Date()).getTime()

      updateTime()

      setNext(true)

      squares = generateSquares()

      setHistory(createGameHistory())

      dispatch(resetSteps())
      dispatch(setGameStatus(GameStatus.GAME_IN_PROGRESS))
    } else {
      window.clearTimeout(timer_id)

      dispatch(setGameStatus(GameStatus.WAITING_TO_START))
    }
  }

  return (
    <div className="game mt-3 max-w-2xl mx-auto flex">
      <div className="mr-3">
        <Welcome />
        <Statistics
          who={next ? 'X' : '0'}
          time={time}
        />
        <Board
          squares={squares}
          onClick={onClickHandler}
        />
      </div>
      <div className="min-w-max">
        <Controls
          disabledDraw={status !== GameStatus.GAME_IN_PROGRESS}
          onClick={controlsOnClickHandler}
        />
      </div>
    </div>
  );
}

export type GameHistory = (RenderSquare | null)[]

export enum Winner {
  X = 'X',
  O = '0',
  DRAW = 'Ничья',
}

export default Game