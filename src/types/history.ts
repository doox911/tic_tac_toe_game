import type { RenderSquare } from '../components/Square'

export interface WinnerObjectFromHistory {
  win: boolean,
  squares: (RenderSquare | null)[]
}