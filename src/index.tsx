/**
 * Styles
 */
import './assets/style/index.css'

/**
 * React
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

/**
 * Components
 */
import Game from './components/Game'

/**
 * Store
 */
import store from './store'
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Game />,
  </Provider>,

  document.getElementById('root')
);