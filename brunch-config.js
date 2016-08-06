module.exports =
  { files:
    { javascripts:
      { joinTo:
        { 'vendor.js': /^(?!app)/
        , 'app.js': /^app/
        }
      }
    , stylesheets: { joinTo: 'app.css' }
    }
  , plugins:
    { babel:
      { presets:
        [ 'es2015'
        , 'stage-0'
        , 'react'
        ]
      , plugins:
        [ 'transform-object-rest-spread'
        ]
      }
    , eslint: {}
    }
  , server:
    { hostname: '0.0.0.0'
    }
  };
