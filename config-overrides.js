const { override, addBabelPlugins } = require('customize-cra');  // Ensure this is at the top of the file

module.exports = override(
  ...addBabelPlugins(
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ),
  (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',  // Ensure Webpack processes .mjs files correctly
    });
    return config;
  }
);
