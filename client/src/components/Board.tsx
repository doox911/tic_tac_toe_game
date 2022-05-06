/**
 * React
 */
import * as React from 'react'

/**
 * Components
 */
import Square from './Square'

/**
 * Constants
 */
 import { GameStatus } from '../constants/game'

/**
 * Store
 */
import { useAppSelector } from '../store/hooks';
import { getGameStatus, getWinnerSquares } from '../store/game'

/**
 * Types
 */
import type { RenderSquare } from './Square'

function Board(props: Props) {

  /**
   * Redux 
   */
  const is_game_over = useAppSelector(getGameStatus) === GameStatus.GAME_OVER
  const winner_squares = useAppSelector(getWinnerSquares)

  const winners = {}

  if (is_game_over) {
    winner_squares.forEach(s => {
      winners[s.id - 1] = true
    })
  }

  return (
    <div className="board mx-auto flex flex-wrap border border-slate-400">
      {
        props.squares.map((square, index) => (
          <Square
            key={square.id}
            square={square}
            is_winner={
              is_game_over
                ? Object.keys(winners).length
                  ? winners[index]
                  : false
                : false
            }
            onClick={() => props.onClick(square)}
          />
        ))
      }
    </div>
  );
}

type Props = {
  squares: RenderSquare[],
  onClick: (square: RenderSquare) => void
}

export default Board