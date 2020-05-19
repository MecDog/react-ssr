const Router = require('koa-router')
const config = require('../../config/appConfig')

// 路由定义
const router = new Router({ prefix: config.apiPrefix })

router.all('/hello', require('../controllers/hello'))
module.exports = router
