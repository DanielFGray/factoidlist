var path = require('path');
var webpack = require('webpack');

module.exports =
  { entry: './app/initialize.js'
  , output:
    { path: __dirname + '/public'
    , filename: 'bundle.js'
    }
  , module:
    { loaders:
      [ { test: /.jsx?$/
        , exclude: /node_modules/
        , loader: 'babel-loader'
        }
      ]
    }
  };
