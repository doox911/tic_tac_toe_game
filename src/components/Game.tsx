import * as React from 'react';
import Board from './Board';

export type CellValue = 'X' | 'O' | null

export type SquareIndexes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Props = {}

type State = {
  history: {
    squares: CellValue[]
    position: null | [number, number]
  }[]
  x_is_next: boolean
  step: number
}

export default class Game extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: null
      }],
      x_is_next: true,
      step: 0,
    };
  }

  handleClick(i: SquareIndexes) {
    const history = this.state.history.slice(0, this.state.step + 1);

    const current = history[history.length - 1]

    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.x_is_next ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares,
        position: getPosition(i)
      }]),
      step: history.length,
      x_is_next: !this.state.x_is_next,
    })
  }

  jumpTo(step: number) {
    this.setState({
      step,
      x_is_next: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;

    const current = history[this.state.step]

    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const position = step.position === null
        ? ''
        : ' [' + step.position + ']'

      const desc = move
        ? `Ход #${move} ${position}`
        : 'Началу игры';

      return (
        <li key={move}>
          <div 
            className="btn"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </div>
        </li>
      );
    })

    return (
      <>
        <div className="status user-select-none">
          {getStatus(current.squares, this.state.x_is_next, winner?.winner)}
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              wins_square={winner ? winner.winner_squares : []}
              squares={current.squares}
              onClick={(i: SquareIndexes) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </>
    );
  }
}

function getStatus(
  squares: CellValue[],
  x_is_next: boolean,
  winner: CellValue
) {
  let status = winner
    ? `Выиграли: ${winner}`
    : `Следующий ход: ${x_is_next ? 'X' : 'O'}`

  if (!winner && squares.filter(e => !!e).length === 0) {
    status = 'Начать игру! Первый ход - X'
  }

  if (!winner && squares.filter(e => !!e).length === squares.length) {
    status = 'Ничья!'
  }

  return status
}

function calculateWinner(squares: CellValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return {
        winner: squares[a],
        winner_squares: lines[i]
      };
    }
  }

  return null;
}

export function getPosition(index: SquareIndexes): [number, number] {
  const p: { [key in SquareIndexes]: [number, number] } = {
    0: [1, 1],
    1: [1, 2],
    2: [1, 3],
    3: [2, 1],
    4: [2, 2],
    5: [2, 3],
    6: [3, 1],
    7: [3, 2],
    8: [3, 3],
  }

  return p[index]
}