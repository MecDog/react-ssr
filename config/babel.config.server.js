'use strict'
const merge = require('webpack-merge')
const baseConfig = require('./bable.config.base')

// 服务端独有的插件
module.exports = merge(baseConfig, {})
