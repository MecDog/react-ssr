// 清理 baseURI 路径
const config = require('../../config/appConfig')

module.exports = () => {
  return async function (ctx, next) {
    if (config.baseURI && config.baseURI !== '/') {
      ctx.path = ctx.path.replace(new RegExp(`^${config.baseURI}`), '') || '/'
    }
    await next()
  }
}
