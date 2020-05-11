/* eslint no-console: 0 */

'use strict'

const path = require('path')
const fs = require('fs-extra')
// const yaml = require('js-yaml')
const webpack = require('webpack')
// const bodyParser = require('body-parser')
const WebpackDevServer = require('webpack-dev-server')

const env = process.env.NODE_ENV || 'development'

const root = path.join(__dirname, '..')
const viewsPath = path.join(root, 'server/views')
const configPath = path.join(root, `config/webpack.config.${env}`)
// const appConfigPath = path.join(root, 'config/app.yaml')

const config = require(configPath)
// const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath))

// const entry = config.entry
const devPort = '9095'
// const devClient = [`webpack-dev-server/client?http://localhost:${devPort}/`]
const publicPath = (config.output.publicPath = `http://localhost:${devPort}/build/`)

fs.removeSync(viewsPath)

// Object.keys(entry).forEach((entryName) => {
//   entry[entryName] = devClient.concat(entry[entryName])
// })

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
  quiet: true,
  noInfo: true,
  compress: true,
  // inline: true,
  disableHostCheck: true,
  port: devPort,
  publicPath: publicPath,
  watchOptions: {
    aggregateTimeout: 300,
  },
  // proxy: {
  //   '/build': {
  //     target: `http://localhost:${devPort}/`,
  //     rewrite: (req) => {
  //       req.url = '/webpack-dev-server'
  //       console.log('proxy')
  //     },
  //   },
  // },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
})

// compiler.plugin('compile', () => {
//   console.info('webpack compile...')
// })

// const app = server.app

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   }),
// )

compiler.hooks.done.tap('done', function (stats) {
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
  const time = (stats.endTime - stats.startTime) / 1000
  const outputPath = config.output.path
  const assets = stats.compilation.assets

  Promise.all(
    Object.keys(assets).map(async (file) => {
      const asset = assets[file]
      const filePath = path.relative(outputPath, asset.existsAt)
      if (path.extname(filePath) === '.html') {
        const content = asset.source()
        const distPath = path.join(viewsPath, filePath)
        return fs.outputFile(distPath, content)
      }
    }),
  )
    .then(() => {
      console.info(`client build success in ${time.toFixed(2)} s`)
    })
    .catch((err) => console.error(err))
})

server.listen(devPort, `localhost`, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('client building...')
})
