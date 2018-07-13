var wallabyWebpack = require('wallaby-webpack');
var webpack = require('webpack');
// var bluebird = require('bluebird');
const path = require('path');

// bluebird.config({warnings: false, longStackTraces: false, monitoring: false});

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'src/**/*.spec.ts', ignore: true, instrument: false },
      
      // required libs
      { pattern: 'node_modules/jquery/dist/jquery.js', instrument: false },
      { pattern: 'node_modules/lodash/lodash.js', instrument: false },
      // { pattern: 'node_modules/gridstack/dist/gridstack.js', instrument: false },
      { pattern: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js', instrument: false },
      { pattern: 'node_modules/reflect-metadata/Reflect.js', include: true},
    ],
    
    tests: [
      { pattern: 'src/**/*.spec.ts', load: false }
    ],
    
    externals: {
      'jquery': 'jquery',
      'jquery-ui': 'jquery-ui',
      'lodash': 'lodash',
      // 'gridstack': 'gridstack',
    },
    
    module: {
      rules: [
        { test: /\.(scss|css)$/, use: 'null' },
        { test: /\.(png|gif|jpg|cur)$/i, use: 'null' },
        { test: /\.(ttf|eot|svg|otf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, use: 'null' },
      ],
      loaders: [
        { test: /\.json$/i, loader: 'json-loader' },
      ]
    },
    
    env: {
      kind: 'chrome'
    },
    
    postprocessor: wallabyWebpack({
      entryPatterns: ['src/**/*.spec.js'],
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, 'node-noop'),
        new webpack.ProvidePlugin({/*'Promise': 'bluebird',*/ $: "jquery", jQuery: "jquery", "window.jQuery": "jquery"}),
      ],
      resolve: {
        modules: [
          path.join(wallaby.projectCacheDir, 'src')
        ],
        alias: {
          'jquery-ui': 'jquery-ui/ui'
        }
      }
    }),
    
    setup: function () {
      window.__moduleBundler.loadTests();
    },
    
    // debugging
    workers: {
        initial: 1,
        regular: 1
    },
    // debug: true
  };
};
