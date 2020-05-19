/* eslint no-console: 0 */

'use strict'

const path = require('path')
const webpack = require('webpack')

process.env.NODE_ENV = 'production'
const env = 'production'

const root = path.join(__dirname, '..')
const configPath = path.join(root, `config/webpack.config.${env}`)

const config = require(configPath)

console.log('client build...')
webpack(config, (err, stats) => {
  if (stats.hasErrors()) {
    console.log('client build error')

    return console.log(
      stats.toString({
        colors: true,
        timings: false,
        hash: false,
        version: false,
        assets: false,
        reasons: false,
        chunks: false,
        children: false,
        chunkModules: false,
        modules: false,
      }),
    )
  }
  console.log('client build success')
  // require(serverEntry)
})
