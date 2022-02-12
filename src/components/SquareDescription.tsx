import * as React from 'react';

/**
 * Types
 */
import type { CellValue } from './Game'

type Props = {
  value: number | string;
}

export default class SquareDescription extends React.Component<Props> {
  render() {
    return (
      <div className="square-description dancing-script-font user-select-none">
        { this.props.value}
      </div>
    );
  }
}