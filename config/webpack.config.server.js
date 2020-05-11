const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const resolvePath = (pathstr) => path.resolve(__dirname, '../server', pathstr)
const babelConfig = require('./babel.config.server')

/**
 * node编译注意要点
 * 1.避免nodemodules被打进包内，有三方包解决了这个问题
 * 2.图片等静态资源处理，一是必须和client的打包保持一致，尤其是publickPath；二是node端的文件，若不移动的话，则代码层必须使用绝对路径
 * 3.less文件处理，其处理也是根据是否使用MiniCssExtractPlugin而不一样
 */
module.exports = {
  target: 'node',
  entry: {
    server: resolvePath('./server.js'),
  }, //入口文件
  output: {
    path: resolvePath('./bundles'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [resolvePath('../client'), 'component', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: babelConfig,
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
              emitFile: false,
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ignore-loader',
          },
        ],
      },
    ],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${process.env.NODE_ENV}"` },
      __SERVER__: true,
    }),
  ],
}
