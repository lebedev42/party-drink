const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');

const commonConfig = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  entry: paths.hotEntryPoint,
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: paths.build,
    watchContentBase: true,
    port: 3000,
    hot: true,
    compress: true,
    overlay: true,
    historyApiFallback: true,
  },
  plugins: [
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    }),
  ],
});
