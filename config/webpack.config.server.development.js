const clientConfig = require('./webpack.config.development')
const baseConfig = require('./webpack.config.server')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
  output: {
    publicPath: clientConfig.output.publicPath,
  },
})
