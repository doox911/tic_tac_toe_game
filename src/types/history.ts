import type { RenderSquare } from '../components/Square'

export interface Winner {
  win: boolean,
  squares: (RenderSquare | null)[]
}