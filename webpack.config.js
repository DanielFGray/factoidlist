var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =
  { resolve:
    { extensions: ['', '.js', '.jsx']
    }
  , entry: './src/initialize.js'
  , output:
    { path: __dirname + '/public'
    , filename: 'bundle.js'
    }
  , module:
    { preLoaders:
      [ { test: /.jsx?$/
        , exclude: /node_modules/
        , loader: 'eslint'
        }
      ]
    , loaders:
      [ { test: /.jsx?$/
        , exclude: /node_modules/
        , loader: 'babel'
        }
      , { test:   /\.css$/
        , loader: 'style!css'
        , loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }
      ]
    }
  , plugins:
    [ new HtmlWebpackPlugin(
      { inject: 'body'
      , title: 'factoid lists'
        , template: './src/assets/index.html'
      })
    , new webpack.optimize.UglifyJsPlugin(
        { compress:
          { warnings: false
          }
        }
      )
    , new ExtractTextPlugin('styles.css')
    , new webpack.DefinePlugin(
      { 'process.env':
        { 'NODE_ENV': JSON.stringify('production')
        }
      })
    , new webpack.optimize.DedupePlugin()
    ]
  };
