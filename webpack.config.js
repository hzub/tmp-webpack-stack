const { resolve } = require('path');

const configBase = require('./config/webpack.config.base');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  devtool: isProduction ? '' : 'cheap-module-eval-source-map',

  entry: [
    './main.js',
  ],

  mode: isProduction ? 'production' : 'development',

  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  context: resolve(__dirname, 'src'),

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'src'),
    historyApiFallback: true,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      ...(configBase.getBaseLoaders(isProduction)),
      ...(configBase.getStyleLoaders(isProduction)),
      ...(configBase.getAssetLoaders(isProduction)),
    ]
  },

  plugins: [
    ...(configBase.getPlugins(isProduction)),
  ],
};

module.exports = config;
