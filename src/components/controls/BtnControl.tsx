/**
 * React
 */
import * as React from 'react';

const default_classes = [
  'min-w-[10em]',
  'p-3',
  'font-mono',
  'rounded-md',
  'text-2xl',
]

const active_classes = [
  'text-white',
  'bg-gradient-to-r',
  'from-sky-600',
  'to-rose-600',
  'hover:from-rose-600',
  'hover:to-sky-600',
]

const disabled_classes = [
  'text-white',
  'bg-gray-300',
  'cursor-not-allowed',
].join(' ')

function BtnControl(props: Props) {
  const classes = props.disabled
    ? [...default_classes, disabled_classes].join(' ')
    : [...default_classes, ...active_classes].join(' ')

  return (
    <button
      className={classes}
      type="button"
      onClick={() => props.onClick()}
    >
      {props.text}
    </button>
  )
}

type Props = {
  disabled?: boolean
  text?: string
  onClick: () => void
}

export default BtnControl;