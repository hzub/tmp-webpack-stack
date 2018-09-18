const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

module.exports = {
  getStyleLoaders,
};
