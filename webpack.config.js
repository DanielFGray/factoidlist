var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
  { resolve:
    { extensions: ['', '.js', '.jsx']
    }
  , entry: './src/initialize.js'
  , output:
    { path: __dirname + '/dist'
    , filename: 'bundle.js'
    }
  , module:
    { loaders:
      [ { test: /.jsx?$/
        , exclude: /node_modules/
        , loader: 'babel-loader'
        }
      , { test:   /\.css$/
        , loader: 'style!css'
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
    ]
  };
