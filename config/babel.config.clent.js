'use strict'
const merge = require('webpack-merge')
const baseConfig = require('./bable.config.base')

// 客户端独有的插件
module.exports = merge(baseConfig, {
  presets: [['@babel/preset-env', { modules: false }]],
  plugins: [['@babel/plugin-transform-runtime', { corejs: 2 }]],
})
