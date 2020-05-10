import React from 'react'
import { Router, Route } from 'react-router'
import routeConfig from './config'
import PropTypes from 'prop-types'

export default function AppRouter({ history }) {
  return (
    <Router history={history}>
      {routeConfig.map((item, index) => (
        <Route component={item.component} key={index}></Route>
      ))}
    </Router>
  )
}

AppRouter.propTypes = {
  history: PropTypes.object,
}
