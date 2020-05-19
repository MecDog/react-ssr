import lazyLoader from '../client/router/lazyLoader'

const Koa = require('koa')
const path = require('path')
const nunjucks = require('koa-nunjucks-2')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const removePrefix = require('./midware/remove-prefix')

const app = new Koa()
const isDev = app.env === 'development'

app.use(bodyParser())

app.use(
  nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
      noCache: isDev,
      autoescape: true,
    },
  }),
)
app.use(removePrefix())
// routers
app.use(router.routes())

lazyLoader.preloadAll().then(() => {
  app.listen(8080, 'localhost', () => {
    console.log(`server started at localhost: 8080`)
  })
})
