const { resolve } = require('path');

const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      ...(configBase.getStyleLoaders(isProduction)),
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 192,
              mimetype: 'image/png',
              name: 'images/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]',
            }
          }
        ],
      },
    ]
  },

  plugins: [
    /*new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        }
      },
    }),*/
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.ejs`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // /*new ExtractTextPlugin({ filename: './styles/style.css', disable: false, allChunks: true }),
    // new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
};

module.exports = config;
