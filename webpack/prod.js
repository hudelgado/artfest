const base = require('./base'),
  merge = require('webpack-merge'),
  prodMode = process.env.build === 'prod',
  htmlWebpackMultiBuildPlugin = require('html-webpack-multi-build-plugin');

const prodConfig = {
  name: 'ProdConfig',
  mode: 'production',
  plugins: [
    new htmlWebpackMultiBuildPlugin()
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true
        },
        hyperhtml: {
          test: /[\\/]hyperhtml[\\/]/,
          name: 'hyperhtml',
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    }
  }
};

module.exports = merge(base, prodConfig);
