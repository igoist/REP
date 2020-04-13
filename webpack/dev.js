const merge = require('webpack-merge');
const common = require('./common.js');
const webpack = require('webpack');
const path = require('path');
const srcPath = './src';

module.exports = merge(common, {
  entry: {
    index: ['react-hot-loader/patch', path.resolve(path.resolve(__dirname, '..'), path.resolve(srcPath, 'index.tsx'))]
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    hot: true,
    inline: true,
    port: 6100,
    publicPath: '/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
