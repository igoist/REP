/* eslint: disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/';

const webpackConfig = {
  resolve: {
    alias: {
      '@Layouts': path.resolve(path.resolve(__dirname, '..'), 'src/layouts/'),
      '@Components': path.resolve(path.resolve(__dirname, '..'), 'src/components/'),
      '@Contexts': path.resolve(path.resolve(__dirname, '..'), 'src/contexts/'),
      '@Utils': path.resolve(path.resolve(__dirname, '..'), 'src/utils/')
    },
    extensions: ['.ts', '.tsx', '.js']
  },

  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(path.resolve(__dirname, '..'), 'dist/'),
    publicPath
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        // test: /\.ts(x)$/,
        loader: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)?$/,
        // test: /\.ts(x)$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(path.resolve(__dirname, '..'), './public/index.html')
    })
  ]
};

module.exports = webpackConfig;
