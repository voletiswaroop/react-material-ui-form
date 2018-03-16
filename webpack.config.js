const path = require('path')
const args = require('yargs').argv
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WebpackStripLoader = require('strip-loader')


const rules = [
  {
    test: /\.js$/,
    exclude: [
      path.resolve(__dirname, 'node_modules'),
    ],
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/env',
        '@babel/react',
        '@babel/stage-0',
      ],
    },
  },
  {
    test: /\.(css|less)$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'less-loader' },
    ],
  },
  {
    test: /\.md$/,
    use: [
      { loader: 'html-loader' },
      { loader: 'markdown-loader' },
    ],
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: { minimize: true },
      },
    ],
  },
]

let plugins = []

// development
if (!args.p) {
  plugins = [
    new HtmlWebPackPlugin({
      template: './examples/index.html',
      filename: './index.html',
    }),
  ]
// production
} else {
  rules.push({
    test: /\.js$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    loader: WebpackStripLoader.loader('console.log'),
  })
}

module.exports = {
  output: {
    libraryTarget: 'umd',
  },
  module: {
    rules,
  },
  plugins,
}
