/**
 * Configurations
 */
import Config from '../config';

/**
 * Types
 */
import type { RenderSquare } from '../components/Square'
import type { GameHistory } from '../components/Game'
import type { Winner } from '../types'

/**
 * Поиск победителя и выигрышной последовательности
 * 
 * @param board_condition Состояние игры
 * @param square Клетка по которой кликнули
 * @returns 
 */
export function findWinner(board_condition: GameHistory, square: RenderSquare): Winner {
  const selected_square_value = board_condition[square.position.y][square.position.x]

  /**
   * Выигрышные варианты 
   */
  const WINNING_OPTIONS = {
    horizontal: [selected_square_value],
    vertical: [selected_square_value],
    left_diogonal: [selected_square_value],
    right_diogonal: [selected_square_value],
  }

  const left_top_condition = 0
  const rigth_bottom_condition = Config.BOARD_SIZE - 1

  for (let i = 1; i < Config.WINNER_LENGTH; i++) {

    /**
     * Оптимизация
     */
    const x_left = square.position.x - i;
    const x_right = square.position.x + i;
    const y_up = square.position.y - i;
    const y_down = square.position.y + i;

    const min_x = x_left >= left_top_condition
    const max_x = x_right <= rigth_bottom_condition
    const min_y = y_up >= left_top_condition
    const max_y = y_down <= rigth_bottom_condition

    if (min_x) WINNING_OPTIONS.horizontal.unshift(board_condition[square.position.y][x_left])
    if (max_x) WINNING_OPTIONS.horizontal.push(board_condition[square.position.y][x_right])

    if (min_y) WINNING_OPTIONS.vertical.unshift(board_condition[y_up][square.position.x])
    if (max_y) WINNING_OPTIONS.vertical.push(board_condition[y_down][square.position.x])

    if (min_y && min_x) WINNING_OPTIONS.left_diogonal.unshift(board_condition[y_up][x_left])
    if (max_y && max_x) WINNING_OPTIONS.left_diogonal.push(board_condition[y_down][x_right])

    if (min_y && max_x) WINNING_OPTIONS.right_diogonal.unshift(board_condition[y_up][x_right])
    if (max_y && min_x) WINNING_OPTIONS.right_diogonal.push(board_condition[y_down][x_left])
  }

  /**
   * Выигрышные клетки
   */
  const WINNERS = {
    horizontal: [],
    vertical: [],
    left_diogonal: [],
    right_diogonal: [],
  }

  const MAX_WINNER_LENGTH = Config.WINNER_LENGTH * 2 - 1

  for (let i = 0; i < MAX_WINNER_LENGTH; i++) {
    for (const KEY in WINNING_OPTIONS) {
      if (WINNING_OPTIONS[KEY][i]?.value === square.value) {
        WINNERS[KEY].push(WINNING_OPTIONS[KEY][i])
      } else {
        if (WINNERS[KEY].length >= Config.WINNER_LENGTH) {
          return {
            win: true,
            squares: WINNERS[KEY],
          }
        } else {
          WINNERS[KEY] = []
        }
      }
    }
  }

  for (const KEY in WINNING_OPTIONS) {
    if (WINNERS[KEY].length >= Config.WINNER_LENGTH) {
      return {
        win: true,
        squares: WINNERS[KEY],
      }
    }
  }

  return {
    win: false,
    squares: [],
  }
}

/**
 * 
 * @returns []
 */
export function generateSquares(): RenderSquare[] {
  const squares = []
  let count = 1

  for (let i = 0; i < Config.BOARD_SIZE; i++) {
    for (let j = 0; j < Config.BOARD_SIZE; j++) {
      squares.push({
        id: count++,
        value: null,
        freeze: false,
        position: {
          x: j,
          y: i,
        },
      })
    }
  }

  return squares
}

/**
 * 
 * @returns 
 */
export function createGameHistory(): GameHistory {
  const history = []

  for (let i = 0; i < Config.BOARD_SIZE; i++) {
    history.push(new Array(Config.BOARD_SIZE).fill(null))
  }

  return history
}