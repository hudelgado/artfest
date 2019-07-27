const path = require('path'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  devMode = process.env.build === 'dev';

const legacyConfig = {
  name: 'LegacyConfig',
  entry: {
    app: ['babel-polyfill', './src/artfest-app.js'],
  },
  output: {
    filename: '[name]_legacy.[contenthash].bundle.js'
  },
  plugins: [
    new ScriptExtHtmlWebpackPlugin({
      custom: [{
        test: 'legacy',
        attribute: 'nomodule',
        value: true
      },{
          test: 'legacy',
          attribute: 'type',
          value: "text/javascript"
      }]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    useBuiltIns: "entry",
                    targets: {
                      browsers: [
                        '> 1%',
                        'last 2 versions',
                        'Firefox ESR',
                      ]
                    }
                  }
                ]
              ]
            }
          },
        ],
      },
    ],
  },
};

module.exports = legacyConfig;
