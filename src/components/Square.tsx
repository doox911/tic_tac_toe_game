import * as React from 'react';

/**
 * Types
 */
import type { CellValue } from './Game'

type Props = {
  classes?: string
  value: CellValue
  onClick: () => void
}

export default class Square extends React.Component<Props> {
  render() {
    const classes = `square dancing-script-font user-select-none ${this.props.classes ? this.props.classes : ''}`

    return (
      <button 
        className={classes}
        onClick={() => this.props.onClick()}
      >
        { this.props.value }
      </button>
    );
  }
}