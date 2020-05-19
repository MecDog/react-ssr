'use strict'

const path = require('path')
const fs = require('fs')
const url = require('url')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')

const root = path.join(__dirname, './')
const buildPath = path.join(root, 'build')

const dllContext = path.join(root, 'client')
const dllPath = path.join(root, '.dll/vendor-manifest.json')
const isDllExist = fs.existsSync(dllPath)

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: true,
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(), // 开启热重载
    new webpack.optimize.ModuleConcatenationPlugin(), // 开启作用域提升

    ...(isDllExist
      ? [
          new webpack.DllReferencePlugin({
            context: dllContext,
            manifest: require(dllPath),
          }),
          new HtmlWebpackTagsPlugin({
            append: false,
            usePublicPath: true,
            addPublicPath: (assetPath, publicPath) => {
              // 默认 publicPath 是 __build，需要改为 __static
              const staticPath = publicPath.replace('__build', '__static')
              return url.resolve(staticPath, assetPath)
            },
            tags: ['.dll/vendor.dll.js'],
          }),
        ]
      : []),
  ],
}

module.exports = merge(baseConfig, config)
