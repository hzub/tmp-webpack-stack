const webpack = require('webpack');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getBaseLoaders() {
  return [{
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
    },];
}
function getStyleLoadersProduction() {
  return [{
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        },
      },
      {
        loader: 'sass-loader',
        query: {
          sourceMap: true,
        },
      },
    ],
  }];
}

function getStyleLoadersDevelopment() {
  return [
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          },
        },
        {
          loader: 'sass-loader',
          query: {
            sourceMap: true,
          },
        },
      ],
    },
  ];
}

function getStyleLoaders(isProduction) {
  return isProduction ? getStyleLoadersProduction() : getStyleLoadersDevelopment();
}

function getAssetLoaders() {
  return [
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
  ];
}

function getPlugins() {
  return [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ];
}

module.exports = {
  getStyleLoaders,
  getBaseLoaders,
  getAssetLoaders,
  getPlugins,
};
