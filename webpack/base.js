const path = require('path'),
  merge = require('webpack-merge'),
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  WorkboxPlugin = require('workbox-webpack-plugin');

const devMode = process.env.build === 'dev'
  multiBuildMode = process.env.build === 'multi',
  legacyMode = process.env.legacy === 'true',
  legacyConfig = require('./legacyConfig');

const filesToOutput = [
  { from: 'ttf', to: 'ttf/' },
  { from: 'images', to: 'images/' },
  { from: 'data', to: 'data/' },
  { from: 'sitemap.txt'},
  { from: '_redirects'},
  { from: 'googlea5f2e4fdb52b35b1.html'},
  { from: 'manifest.json'}
];

const base = {
  entry: {
    app: './src/artfest-app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
        inject: true,
        template: 'index.html',
        chunksSortMode: 'none'
      }
    ),
    new webpack.HashedModuleIdsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
      module: 'bundle'
    }),
    new CopyWebpackPlugin([ ...filesToOutput ], { ignore: [ '.DS_Store' ] }),
    new WorkboxPlugin.GenerateSW({
      include: [/\.html$/, /\.js$/, /\.png$/, /\.json$/, /\.ttf$/],
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [{
        urlPattern: /data\/images/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'images'
        }
      }]
    })
  ]
};


if (!devMode) {
  base.plugins.push(
    new CleanWebpackPlugin(['dist'], { root: __dirname + '/..' })
  );
}

if (legacyMode) {
  module.exports = merge(base, legacyConfig);
} else {
  module.exports = base;
}
