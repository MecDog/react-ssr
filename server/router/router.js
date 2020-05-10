const Router = require('koa-router')
const config = require('../lib/config')

// 路由定义
const router = new Router({ prefix: config.apiPrefix })

router.all('/hello', require('../controllers/hello'))
console.log('apiPrefix', config.apiPrefix)
module.exports = router
