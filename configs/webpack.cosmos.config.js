module.exports = baseConfig => {
  // Setup js rule to use the locally installed babel-loader and presets/plugins
  const jsRule = baseConfig.module.rules.find(rule => rule.test.test('.js'));
  jsRule.exclude = /node_modules\/(?!(gatsby)\/)/;
  jsRule.use.loader = require.resolve('babel-loader');
  jsRule.use.options.presets = [require.resolve('babel-preset-gatsby')];
  jsRule.use.options.plugins = [
    require.resolve('babel-plugin-remove-graphql-queries'),
    // require.resolve('@emotion/babel-preset-css-prop'),
  ];

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
