'use strict'

module.exports = {
  presets: [
    [require.resolve('@babel/preset-env'), { modules: false }],
    [require.resolve('@babel/preset-react')],
  ],
  plugins: [
    [require.resolve('@babel/plugin-transform-runtime'), { corejs: 2 }],
    require.resolve('babel-plugin-transform-promise-to-bluebird'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
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
