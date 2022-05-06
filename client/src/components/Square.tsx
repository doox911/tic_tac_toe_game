/**
 * React
 */
import * as React from 'react';

/**
 * Constants
 */
import { GameStatus } from '../constants/game'

/**
 * Store
 */
import { useAppSelector } from '../store/hooks';
import { getGameStatus } from '../store/game'

const default_classes = 'xo-square block bg-slate-300 border border-slate-200 text-lg text-center drop-shadow-md'

function Square(props: Props) {

  /**
   * Redux 
   */
  const status = useAppSelector(getGameStatus)

  const is_game_over = status === GameStatus.GAME_OVER

  const render_value = renderSquareValue(props.square.value)

  const disabled = is_game_over || status !== GameStatus.GAME_IN_PROGRESS || !!render_value

  const text_class = render_value === null
    ? ''
    : `xo-square-${render_value.toLocaleLowerCase()}--text`

  const classes = disabled
    ? props.is_winner
      ? `${default_classes} disabled xo-square-winner--text`
      : `${default_classes} disabled ${text_class}`
    : `${default_classes} ${text_class} cursor-pointer hover:bg-slate-100 hover:border-slate-200`

  return (
    <div
      className={classes}
      onClick={() => onClickHandler(props, disabled)}
    >
      {render_value}
    </div>
  );
}

function renderSquareValue(value: SquareValue): SquareRenderValue {
  return value === null
    ? null
    : value
      ? 'X'
      : '0'
}

function onClickHandler(props: Props, disabled: boolean): void {
  if (!disabled) {
    props.onClick()
  }
}

type Props = {
  classes?: string
  square: RenderSquare
  is_winner: boolean
  onClick: () => void
}

export type SquareValue = 1 | 0 | null

export type SquareRenderValue = 'X' | '0' | null

export type RenderSquare = {
  id: number
  value: SquareValue
  position: {
    x: number
    y: number
  }
}

export type SquareHistoryValue = RenderSquare & {
  is_win: boolean
}

export default Square;