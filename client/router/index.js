import React from 'react'
// import { Route } from 'react-router'
import PropTypes from 'prop-types'
import RouteConfig from './config'
import LazyLoader from './lazyLoader'
import { matchRoutes, renderRoutes } from 'react-router-config'

// function renderRoute(config, index) {
//   return <Route {...config} key={index}></Route>
// }

export default function AppRouter() {
  return <div>{renderRoutes(RouteConfig)}</div>
}
AppRouter.propTypes = {
  history: PropTypes.object,
}

function matchRouteByPath(path) {
  return matchRoutes(RouteConfig, path).map((item) => item.route)
}
export { RouteConfig, LazyLoader, matchRouteByPath }
