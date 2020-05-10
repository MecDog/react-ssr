const path = require('path')
const webpack = require('webpack')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'client')
const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'
const cssLoaders = [MiniCssExtractPlugin.loader]
const babelConfig = require('./babel.config')

module.exports = {
  context: srcPath,
  entry: {
    app: path.join(root, './client/index.js'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      common: path.join(srcPath, 'common'),
      components: path.join(srcPath, 'components'),
      utils: path.join(srcPath, 'utils'),
      pages: path.join(srcPath, 'pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
        options: {
          id: 'js',
        },
      },
      {
        test: /\.tpl$/,
        loader: 'dot-tpl-loader',
      },
      {
        oneOf: [
          {
            test: /\.html$/,
            resourceQuery: /\?.*/,
            use: ['nunjucks-loader', 'extract-loader', 'html-loader'],
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            resourceQuery: /\?.*/,
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[hash:20].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [
          ...cssLoaders,
          {
            loader: 'css-loader',
            options: {
              minimize: !isDev,
              sourceMap: isDev,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname),
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: babelConfig,
        },
      ],
      verbose: isDev,
      verboseWhenProfiling: isDev,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   filename: 'error.html',
    //   template: 'public/error.html',
    //   chunksSortMode: 'none',
    //   favicon: 'public/favicon.ico',
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['runtime', 'common', 'app'],
      chunksSortMode: 'manual',
    }),
  ],
}
