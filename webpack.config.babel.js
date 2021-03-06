/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babelOpts = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [
    'babel-loader',
    'eslint-loader',
  ],
}

const cssOpts = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: ExtractTextPlugin.extract({
    use: [
      'css-loader',
    ],
  }),
}

const pluginList = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module =>
      module.context && module.context.indexOf('node_modules') !== -1,
  }),
  new ExtractTextPlugin({
    filename: '[name].bundle.css',
    allChunks: true,
  }),
  new HtmlWebpackPlugin({
    template: 'src/assets/index.ejs',
    inject: false,
    title: 'Factoid List',
    appMountId: 'app',
    mobile: true,
    devServer: '',
  }),
]

const stats = {
  chunks: false,
  modules: false,
  children: false,
}

module.exports = {
  entry: './src/initialize',
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      babelOpts,
      cssOpts,
    ],
  },
  plugins: pluginList,
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    stats,
  },
  stats,
}
