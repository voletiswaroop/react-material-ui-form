const path = require('path')
const args = require('yargs').argv
const HtmlWebPackPlugin = require('html-webpack-plugin')


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
      template: './example/index.html',
      filename: './index.html',
    }),
  ]
}

module.exports = {
  module: { rules },
  plugins,
}
