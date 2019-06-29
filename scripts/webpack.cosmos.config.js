const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = baseConfig => {
  // Setup js rule to use the gatsby version to support graphql calls
  const jsRule = baseConfig.module.rules.find(rule => rule.test.test('.js'));
  jsRule.exclude = /node_modules\/(?!gatsby)/;
  jsRule.use.loader = require.resolve('gatsby/dist/utils/babel-loader.js');

  // Remove JSON rule since webpack4 already handles it
  const jsonRuleIndex = baseConfig.module.rules.findIndex(rule =>
    rule.test.test('.json')
  );
  baseConfig.module.rules.splice(jsonRuleIndex, 1);

  // Add missing image rule to use url-loader
  baseConfig.module.rules.push({
    test: /\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/,
    use: [
      {
        loader: require.resolve(`url-loader`),
        options: {
          limit: 10000,
          name: `static/[name]-[hash].[ext]`,
        },
      },
    ],
  });

  // For gatsby-link, see https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/visual-testing-with-storybook.md
  baseConfig.plugins.push(
    new webpack.DefinePlugin({
      __PATH_PREFIX__: JSON.stringify(''),
      ___loader: {
        enqueue: () => {},
        hovering: () => {},
      },
      'window.___navigate': () => {},
    })
  );

  // Override mainFields to better match gatsby resolution
  baseConfig.resolve.mainFields = ['browser', 'module', 'main'];

  baseConfig.resolve.alias = {
    '@babel/runtime': path.dirname(
      require.resolve('@babel/runtime/package.json')
    ),
    'core-js': path.dirname(require.resolve('core-js/package.json')),
  };

  baseConfig.optimization.minimize = isProd;

  return baseConfig;
};
