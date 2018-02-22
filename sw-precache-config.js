/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint-env node */

module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'bower_components/webcomponentsjs/webcomponents-lite.js',
    'images/*',
  ],
  dynamicUrlToDependencies: {
    '/': ['index.html']
  },
  navigateFallback: '/',
  runtimeCaching: [{
      urlPattern: /\/bower_components\/webcomponentsjs\/.*.js/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'webcomponentsjs-polyfills-cache',
        },
      },
    }, {
      urlPattern: /\/bower_components\/bulma-carousel\/dist\/.*.min.(js,css)/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 100,
          name: 'bulma-cache'
        }
      }
    }, {
      urlPattern: /.*\.(png|jpg|gif|svg)/i,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 200,
          name: 'data-images-cache-v1'
        }
      }
    }, {
      urlPattern: /\/data\/filmes\/.*\.(html|json)/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 100,
          name: 'movies-cache-v1'
        }
      }
    }, {
      urlPattern: /\/data\/grupos\/.*\.(html|json)/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 100,
          name: 'groups-cache-v1'
        }
      }
    }, {
      urlPattern: /\/data\/.*json/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 10,
          name: 'data-json-cache-v1'
        }
      }
    }
  ]
};
