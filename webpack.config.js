const path = require('path')
const args = require('yargs').argv
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WebpackStripLoader = require('strip-loader')
const webpack = require('webpack')


const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      ignore: [
        '**/__tests__',
      ],
      presets: [
        'env',
        'flow',
        'react',
        'stage-0',
      ],
      plugins: ['transform-decorators-legacy'],
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

let devtool = false
const plugins = []
const externals = []

// development
if (!args.p) {
  plugins.push(
    new HtmlWebPackPlugin({
      template: './examples/index.html',
      filename: './index.html',
    })
  )
// production
} else {
  devtool = 'source-map'
  externals.push('react', 'react-dom', 'material-ui')
  rules.push({
    test: /\.js$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    loader: WebpackStripLoader.loader('console.log'),
  })
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    })
  )
}

module.exports = {
  devtool,
  devServer: {
    historyApiFallback: true,
  },
  externals,
  output: {
    filename: 'material-ui-form.min.js',
    library: 'MaterialUIForm',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'bundle'),
    umdNamedDefine: true,
  },
  module: {
    rules,
  },
  plugins,
}
