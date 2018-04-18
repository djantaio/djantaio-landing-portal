'use strict';

let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//let HtmlWebpackExcludeEmptyAssetsPlugin = require('html-webpack-exclude-empty-assets-plugin');

let _ = require('lodash');

let webpack = require('webpack');
let config = require('./config');

module.exports = {
  entry: config.vandor.mapping,
  output: {
    filename: '[name].js',
    path: config.build.dist
  },
  resolve: {
    // directories where to look for modules
    modules: ['node_modules', path.resolve(__dirname, 'src')],

    extensions: ['.js', '.json', '.jsx', '.css'],

    /* alternative alias syntax (click to show) */
    alias: {
      //"module": path.resolve(__dirname, "app/third/module.js")
    }
  },
  externals: {
    'jquery': '$'
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    /*assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }*/
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      minChunks: Infinity,
    },
    runtimeChunk: 'multiple'
  },
  /*optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some(chunk => {
              return chunk.name === 'main' && /[\\/]node_modules[\\/]/.test(name);
            });
          }
        },
        secondary: {
          name: 'secondary',
          chunks: 'all',
          priority: 2,
          enforce: true,
          test(module, chunks) {
            return chunks.some(chunk => chunk.name === 'secondary');
          }
        }
      }
    }
  }*/
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /default\.mustache$/,
        loader: 'mustache-loader',
        options: {
          tiny: true,
          render: config.site.head,
        },
      }/*,
      {
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: /API_URL/g, replace: process.env['PLUNKER_API_URL'] },
            { search: /EMBED_URL/g, replace: process.env['PLUNKER_EMBED_URL'] },
            { search: /RUN_URL/g, replace: process.env['PLUNKER_RUN_URL'] },
            { search: /SHOT_URL/g, replace: process.env['PLUNKER_SHOT_URL'] },
            { search: /WWW_URL/g, replace: process.env['PLUNKER_WWW_URL'] },
          ],
        }
      },*/
    ]
  },
  plugins: [
    new CleanWebpackPlugin(config.clean),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
  .concat(_.map(Object.keys(config.resources), name => new CopyWebpackPlugin(config.resources[name], {
    glob: '\*\*/\*',
    dot: true,
    debug: 'warning'
  })))
  .concat(_.map(config.site.pages.common, page => new HtmlWebpackPlugin(_.merge({
      hash: false,
      inject: !_.isNil(page.scope) ? page.scope : 'body',
      filename: page.name, //relative to root of the application
      chunks: !_.isNil(page.lib) ? _.isArrayLikeObject(page.lib) ? page.lib.concat(config.vandor.chunks.default)
        : [page.lib].concat(config.vandor.chunks.default) : config.vandor.chunks.default,
      minify: config.minify //trim the rendered html source ...
    }, !_.isNil(page.file) ? { template: page.file } : {} ))
  ))
  //.concat(new HtmlWebpackExcludeEmptyAssetsPlugin())
};
