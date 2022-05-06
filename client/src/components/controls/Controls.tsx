/**
 * React
 */
import * as React from 'react';

/**
 * Components 
 */
import BtnControl from './BtnControl';

/**
 * Constants
 */
import { GameStatus } from '../../constants/game'

/**
 * Store
 */
import { useAppSelector } from '../../store/hooks'
import { getGameStatus } from '../../store/game'

const start = new Audio('static/audio/start_game.wav');

const end = new Audio('static/audio/end_game.wav');

const draw = new Audio('static/audio/draw.wav');

function Controls(props: Props) {

  /**
   * Redux
   */
  const status = useAppSelector(getGameStatus)

  const text_1 = status === GameStatus.WAITING_TO_START || status === GameStatus.GAME_OVER
    ? 'Начать игру'
    : 'Закончить игру'
  
  return (
    <div className="flex flex-col">
      <BtnControl
        disabled={props.disabledPlayStop}
        text={text_1}
        onClick={() => onclickHandler(props, status === GameStatus.GAME_IN_PROGRESS)}
      />
      <div className="mb-2" />
      <BtnControl
        disabled={props.disabledDraw}
        text={'Ничья'}
        onClick={() => drawOnclickHandler(props)}
      />
    </div>
  )
}

function onclickHandler(props: Props, is_playing: boolean): void {
  if(props.disabledPlayStop) {
    return
  }

  if (is_playing) {
    if (window.confirm('Вы уверены?')) {
      end.play();

      props.onClick({
        clicked: 'stop'
      })
    }
  } else {
    start.play();

    props.onClick({
      clicked: 'play'
    })
  }
}

function drawOnclickHandler(props: Props) {
  if(props.disabledDraw) {
    return
  }

  if (window.confirm('Вы уверены?')) {
    draw.play();
    props.onClick({
      clicked: 'draw'
    })
  }
}

type Props = {
  disabledDraw?: boolean
  disabledPlayStop?: boolean
  onClick: (event: ControlEvent) => void
}

export type ControlEvent = {
  clicked: 'play' | 'stop' | 'draw'
}

export default Controls;