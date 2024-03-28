const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: 'development',
    entry: {
      popup: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        { test: /\.(svg|png)$/, use: ['file-loader'] },
        ,
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        scriptLoading: 'module',
        // filename
        inject: true,
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
      server: 'http',
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
  };
};
