'use strict'

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = path.join(__dirname, './')
const buildPath = path.join(root, 'build')

const config = {
  mode: 'production',
  output: {
    pathinfo: true,
    path: buildPath,
    publicPath: '/',
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    hashDigestLength: 22,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash]css',
      chunkFilename: '[id].[hash].css',
    }),
    // 配合splitChunks, 避免因模块id的变化导致文件hash变化
    new webpack.HashedModuleIdsPlugin(),
  ],
}

module.exports = merge(baseConfig, config)
