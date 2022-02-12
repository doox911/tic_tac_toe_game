import * as React from 'react'
import { chunk } from "lodash"

/**
 * Components
 */
 import Square from './Square'
 import SquareDescription from './SquareDescription'

/**
 * Types
 */
import type { CellValue, SquareIndexes } from './Game'

type Props = {
  squares: CellValue[]
  wins_square: number[]
  onClick: (i: number) => void
}

export default class Board extends React.Component<Props> {

  renderSquare(i: SquareIndexes) {
    const classes = this.props.wins_square.find(e => e === i) !== undefined  
      ? 'winner-square' 
      : ''

    return (
      <Square
        classes={classes}
        key={`s-${i}`}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoardRow(squares: CellValue[], chunck: number, index: number) {
    return (
      <div
        key={`br-${index}`}
        className="board-row"
      >
        <SquareDescription value={index + 1}/>
        {squares.map((s, j) => this.renderSquare(chunck * index + j as SquareIndexes))}
      </div>
    )
  }

  render() {
    const size = 3
    const squares: CellValue[][] = chunk(this.props.squares, size);

    return (
      <div className="board">
             <div
        key={`br-`}
        className="board-row"
      >
        <SquareDescription value=""/>
        <SquareDescription value="1"/>
        <SquareDescription value="2"/>
        <SquareDescription value="3"/>
      </div>
        
        {squares.map((sqrs, i) => this.renderBoardRow(sqrs, size, i))}
      </div>
    );
  }
}