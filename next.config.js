/* eslint-disable no-param-reassign */
const withLess = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');

const modifyVars = require('./src/assets/nextCustomVars.js');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withPlugins(
  [
    [
      withLess,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 2,
          localIdentName: '[local]___[hash:base64:5]'
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars
        }
      }
    ],
    [withCSS, { cssModules: false }]
  ],
  {
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals)
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader'
        });
      }

      config.module.rules.forEach(rule => {
        if (rule.test && rule.test.toString().includes('.less')) {
          rule.rules = rule.use.map(useRule => {
            if (typeof useRule === 'string') {
              return { loader: useRule };
            }

            if (useRule.loader.startsWith('css-loader')) {
              return {
                oneOf: [
                  {
                    test: new RegExp('.modules.less$'),
                    loader: useRule.loader,
                    options: useRule.options
                  },
                  {
                    loader: useRule.loader,
                    options: { ...useRule.options, modules: false }
                  }
                ]
              };
            }

            return useRule;
          });

          delete rule.use;
        }
      });
      return config;
    },
    publicRuntimeConfig: {
      NODE_ENV: process.env.NODE_ENV,
      REDIS_HOST: process.env.REDIS_HOST,
      NOTIFICATIONS_ENDPOINT: process.env.NOTIFICATIONS_ENDPOINT,
      ELASTIC_ENDPOINT: process.env.ELASTIC_ENDPOINT,
      SOCKET_ENDPOINT: process.env.SOCKET_ENDPOINT,
      API_ENDPOINT: process.env.API_ENDPOINT,
      AUTH_ENDPOINT: process.env.AUTH_ENDPOINT,
      GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
      BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY
    }
  }
);
