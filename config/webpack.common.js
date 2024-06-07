const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FontPreloadPlugin = require('webpack-font-preload-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const paths = require('./paths');
const moduleAlias = require('./moduleAlias');

const isDev = process.env.MODE === 'dev';
const isProduction = process.env.MODE === 'prod';

module.exports = {
  output: {
    path: paths.build,
    filename: '[contenthash].bundle.js',
    chunkFilename: '[contenthash].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: ['node_modules', paths.src],
    alias: moduleAlias,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            [
              'babel-plugin-named-asset-import',
              {
                loaderMap: {
                  svg: {
                    ReactComponent:
                      '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                  },
                },
              },
            ],
          ],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpe?g|gif|swf|svg|json|fnt)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf|png|fnt)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]-[hash:6].[ext]',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  cleanupIDs: false,
                  prefixIds: false,
                  mergePaths: false,
                  moveElemsAttrsToGroup: false,
                  inlineStyles: false,
                  removeUselessStrokeAndFill: false,
                },
              ],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new FontPreloadPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/*.(ico|png|svg|json|js)', to: '[name][ext]' },
        {
          from: 'public/assets/*.(ico|png|svg|json|js)',
          to: 'assets/[name][ext]',
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
