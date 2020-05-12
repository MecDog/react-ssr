'use strict'

// 对es6正式语法之外的编译， client和server都会用到
module.exports = {
  presets: [['@babel/preset-react']],
  plugins: [
    'babel-plugin-transform-promise-to-bluebird',
    'babel-plugin-jsx-control-statements',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties'],
    '@babel/plugin-proposal-object-rest-spread',
    ['babel-plugin-import', { libraryName: 'antd', style: true, libraryDirectory: 'es' }],
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    development: {
      plugins: [
        // 'react-hot-loader/babel',
        '@babel/plugin-transform-react-jsx-source',
      ],
    },
    production: {
      plugins: ['babel-plugin-transform-react-remove-prop-types'],
    },
  },
  sourceMaps: true,
  retainLines: true,
}
