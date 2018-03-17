'use strict';
const htmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackConfig = new htmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/main.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'env', 'react', 'es2015' ]
        }
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [ htmlWebpackConfig ],
  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: {
      index: '/'
    }
  }
};
