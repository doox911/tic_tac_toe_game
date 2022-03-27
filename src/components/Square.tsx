/**
 * React
 */
import * as React from 'react';

/**
 * Store
 */
import { useAppSelector } from '../store/hooks';
import { getIsGameOver } from '../store/game'

/**
 * Types
 */
export type SquareValue = 1 | 0 | null
export type SquareRenderValue = 'X' | '0' | null
export type SquareHistoryValue = {
  id: number
  value: SquareValue
  is_win: boolean
  freeze: boolean
  position: {
    x: number
    y: number
  }
}

export type RenderSquare = {
  id: number
  value: SquareValue
  freeze: boolean
  position: {
    x: number
    y: number
  }
}

type Props = {
  classes?: string
  square: RenderSquare
  is_winner: boolean
  onClick: () => void
}


/**
 * @TODO На время разработки
 */
const square_classes = [
  'xo-square',
  'block',
  'bg-slate-300',
  'border',
  'border-slate-200',
  'text-lg',
  'text-center drop-shadow-md',
].join(' ')

export default function Square(props: Props) {
  const is_game_over = useAppSelector(getIsGameOver)

  const render_value = renderSquareValue(props.square.value)

  const text_class = render_value === null 
    ? ''
    : `xo-square-${render_value.toLocaleLowerCase()}--text`

  const classes = is_game_over 
    ? props.is_winner 
      ? `${square_classes} disabled xo-square-winner--text`
      : `${square_classes} disabled ${text_class}`
    : `${square_classes} ${text_class} cursor-pointer hover:bg-slate-100 hover:border-slate-200`
  
  return (
    <div
      className={ classes }
      onClick={ () => props.onClick() }
    >
      { render_value }
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