const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'postcss-loader', 'sass-loader'],
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: './assets/scripts/index.jsx',
  output: {
    path: `${__dirname}/../public`,
    publicPath: '/',
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
    ],
  },
  devServer: {
    contentBase: `${__dirname}/../public`,
    compress: true,
    stats: 'errors-only',
    hot: true,
    open: true,
    openPage: '',
    proxy: {
      '/api': 'http://localhost:3000',
      '/share': 'http://localhost:3000',
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'NotesMD',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: './assets/index.ejs',
    }),
    new ExtractTextPlugin({
      filename: 'index.css',
      allChunks: true,
      disable: !isProd,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new OfflinePlugin({
      publicPath: '/',
      ServiceWorker: {
        navigateFallbackURL: '/',
      },
    }),
  ],
};
