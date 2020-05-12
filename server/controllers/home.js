import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import AppRouter, { matchRouteByPath } from '../../client/router/index'

module.exports = async (ctx) => {
  let context = {}
  let routes = matchRouteByPath(ctx.path)
  if (routes[0] && routes[0].component.getInitialProps) {
    context.initialProps = await routes[0].component.getInitialProps()
  }
  const html = renderToString(
    <StaticRouter location={ctx.path} context={context}>
      <AppRouter></AppRouter>
    </StaticRouter>,
  )
  try {
    await ctx.render('index', {
      html,
      initialProps: JSON.stringify(context.initialProps),
    })
  } catch (e) {
    ctx.body = 'HTML 静态模板编译中，请稍后刷新页面...'
  }
}
