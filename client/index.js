import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'

import AppRouter, { matchRouteByPath } from './router'
// import { Provider } from 'react-redux'
import history from './utils/history'

const render = () => {
  ReactDOM.hydrate(
    <Router history={history}>
      <AppRouter />
    </Router>,
    document.getElementById('app'),
  )
}

let matchRoutes = matchRouteByPath(history.location.pathname)
if (matchRoutes.length) {
  Promise.all(matchRoutes.map((route) => route.component.preload())).then(() => {
    render()
  })
}

if (module.hot) {
  module.hot.accept('./router', () => {
    render()
  })
}
