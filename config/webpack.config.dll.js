const path = require('path')
const srcPath = path.join(__dirname, '../')

module.exports = {
  context: srcPath,
  mode: 'development',
  entry: {
    vendor: [
      'react',
      'lodash',
      'react-router',
      'react-dom',
      'moment',
      'antd',
      'bluebird',
      'axios',
      '@babel/polyfill',
      'core-js',
    ],
  },
  output: {
    path: path.join(srcPath, '.dll'),
    filename: '[name].dll.js',
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      context: clientPath, // 必填项，用来标志manifest中的路径
      path: path.join(srcPath, '.dll', '[name]-manifest.json'), // 必填项，存放manifest的路径
      name: '[name]', // 必填项，manifest 的 name, 这里这里要与 output.library 名字保持一致
    }),
  ],
}
