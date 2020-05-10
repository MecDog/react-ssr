import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router'
// import { Provider } from 'react-redux'
import history from './utils/history'

const render = () => {
  ReactDOM.render(<AppRouter history={history} />, document.getElementById('app'))
}

render()

if (module.hot) {
  module.hot.accept('./router', () => {
    render()
  })
}
