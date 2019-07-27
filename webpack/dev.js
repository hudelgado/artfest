const base = require('./base'),
merge = require('webpack-merge'),
  legacyMode = process.env.legacy === 'true';

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: false,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    https: false,
  }
};

module.exports = merge(base, devConfig);
