const webpack = require('atool-build/lib/webpack');

module.exports = (wc, env) => {
  const webpackConfig = wc;
  webpackConfig.babel.plugins.push('transform-runtime');
  // make plugin babel-plugin-import effect
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true,
  }]);

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = 'source-map';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((load, index) => {
    const loader = load;
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  return webpackConfig;
};
