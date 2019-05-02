module.exports = baseConfig => {
  // Setup js rule to use the gatsby version to support graphql calls
  const jsRule = baseConfig.module.rules.find(rule => rule.test.test('.js'));
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

  // Override mainFields to better match gatsby resolution
  baseConfig.resolve.mainFields = ['browser', 'module', 'main'];

  return baseConfig;
};
