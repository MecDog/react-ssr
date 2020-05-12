/* eslint no-console: 0 */

'use strict'

const path = require('path')
const webpack = require('webpack')
const { spawn } = require('child_process')

const env = process.env.NODE_ENV || 'development'

const root = path.join(__dirname, '..')
const configPath = path.join(root, `config/webpack.config.server.${env}`)

const config = require(configPath)
const serverEntry = path.join(config.output.path, './server.js')

let serverProcess
console.log('server build...')
webpack(config, (err, stats) => {
  if (stats.hasErrors()) {
    console.log('server build error')

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
  console.log('server build success')
  // require(serverEntry)
  if (serverProcess) {
    serverProcess.kill()
  }
  serverProcess = spawn('node', ['--inspect=9222', serverEntry], { stdio: 'inherit' })
})
