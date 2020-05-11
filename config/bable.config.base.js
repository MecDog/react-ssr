'use strict'

// 对es6正式语法之外的编译， client和server都会用到
module.exports = {
  presets: [[require.resolve('@babel/preset-react')]],
  plugins: [
    require.resolve('babel-plugin-transform-promise-to-bluebird'),
    require.resolve('babel-plugin-jsx-control-statements'),
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    [require.resolve('@babel/plugin-proposal-class-properties')],
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      require.resolve('babel-plugin-import'),
      { libraryName: 'antd', style: true, libraryDirectory: 'es' },
    ],
    require.resolve('@babel/plugin-proposal-optional-chaining'),
  ],
  env: {
    development: {
      plugins: [
        // require.resolve('react-hot-loader/babel'),
        require.resolve('@babel/plugin-transform-react-jsx-source'),
      ],
    },
    production: {
      plugins: [require.resolve('babel-plugin-transform-react-remove-prop-types')],
    },
  },
  sourceMaps: true,
  retainLines: true,
}
