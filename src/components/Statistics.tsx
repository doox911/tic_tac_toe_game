/**
 * React
 */
import * as React from 'react';

/**
 * Store
 */
import { useAppSelector } from '../store/hooks'
import { getStep } from '../store/game'

/**
 * Types
 */
import { SquareRenderValue } from './Square';

function Statistics(props: Props) {

  /**
   * Redux
   */
  const step = useAppSelector(getStep)

  return (
    <div className="statistics max-w-2xl mx-auto flex justify-between user-select-none">
      <div className="statistics-text--gradient">
        Ход №: {step}
      </div>
      <div className="statistics-text--gradient">
        Ходит: {props.who}
      </div>
      <div className="statistics-text--gradient">
        Время: {props.time}
      </div>
    </div>
  )
}

type Props = {
  who: Exclude<SquareRenderValue, null>
  time: string
}

export default Statistics