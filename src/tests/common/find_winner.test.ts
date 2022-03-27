import { findWinner, createGameHistory, generateSquares } from '../../common'

const history = createGameHistory()
const squares = generateSquares()

it('Find winner', () => {
  let _squares = [...squares]
  let _history = [...history]

  for (let i = 0; i < 5; i++) {
    _squares[i].value = 1

    history[_squares[i].position.y][_squares[i].position.x] = _squares[i]
  }

  expect(findWinner(_history, _squares[4]).win).toEqual(true);

  _squares = [...squares]
  _history = [...history]

  for (let i = 0; i < 9; i++) {
    _squares[i].value = 1

    history[_squares[i].position.y][_squares[i].position.x] = _squares[i]
  }

  expect(findWinner(_history, _squares[8]).win).toEqual(true);

  _squares[4].value = 0

  history[_squares[4].position.y][_squares[4].position.x] = _squares[4]

  expect(findWinner(_history, _squares[8]).win).toEqual(false);

  /**
   * Восстанавливаем
   */
  _squares[4].value = 1

  history[_squares[4].position.y][_squares[4].position.x] = _squares[4]

  _squares[2].value = 0

  history[_squares[2].position.y][_squares[2].position.x] = _squares[2]

  expect(findWinner(_history, _squares[8]).win).toEqual(true);

  /**
   * Восстанавливаем
   */
  _squares[2].value = 1

  history[_squares[2].position.y][_squares[2].position.x] = _squares[2]

  _squares[6].value = 0

  history[_squares[6].position.y][_squares[6].position.x] = _squares[6]

  expect(findWinner(_history, _squares[3]).win).toEqual(true);
});