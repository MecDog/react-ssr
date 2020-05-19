const Router = require('koa-router')
const home = require('../controllers/home')
const customRouter = require('./router.js')
const { apiPrefix } = require('../../config/appConfig')

const router = new Router()

// 首页
router
  .get('/', home)
  .all('/sw.js', require('../controllers/sw.js'))
  // 路由定义
  .use(customRouter.routes())
  // 自动代理到 java 和 首页渲染
  .all('*', async (ctx) => {
    // 如果路径以 apiPrefix 开头，认为是 ajax 请求
    if (!apiPrefix) {
      /* eslint-disable no-console */
      console.warn('apiPrefix 未配置，proxy 功能无法正常使用！')
    }
    // 自动代理
    // if (apiPrefix && ctx.path.startsWith(apiPrefix) && ctx.path !== apiPrefix) {
    //   const proxy = papayaProxy({
    //     map: ctx.apiMap,
    //   })

    //   await proxy(ctx, next)
    // } else {
    // 其他请求 尝试使用首页渲染
    await home(ctx)
    // }
  })

module.exports = router
