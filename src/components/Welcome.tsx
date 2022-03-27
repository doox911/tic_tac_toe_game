/**
 * React
 */
import * as React from 'react';

/**
 * Store
 */
import { useAppDispatch } from '../store/hooks'
import { setGameStatus } from '../store/game'

const start = new Audio('static/audio/good.mp3');

export default function Welcome() {

  /**
   * Redux
   */
  const dispatch = useAppDispatch();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col align-center">
        <h1 className="user-select-none font-mono text-2xl mb-5">
          Игра в <span className="text-sky-600">крестики</span>-<span className="text-rose-600">нолики</span>
        </h1>
        <button
          className="font-mono text-2xl hover:text-sky-600"
          type="button"
          onClick={() => start.play() && dispatch(setGameStatus(2))}
        >
          ИГРАТЬ
        </button>
      </div>
    </div>
  )
}