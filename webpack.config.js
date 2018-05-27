/* eslint-disable no-undefined */
/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const packageJson = require('./package.json');

const { argv } = require('yargs').options({
  production: {
    alias: 'p',
    'default': false,
    type: 'boolean'
  },
  watch: {
    'default': false,
    type: 'boolean'
  },
  port: {
    'default': 8080, // eslint-disable-line no-magic-numbers
    type: 'number'
  }
});

const projectPath = __dirname;
const sourcePath = join(projectPath, 'src');
const buildPath = join(projectPath, 'docs');
const nameSuffix = argv.production ? `[hash].min` : '[hash]';

if (argv.watch) {
  require('serve-local')(buildPath, argv.port);
}

module.exports = {
  mode: argv.production ? 'production' : 'development',
  entry: join(sourcePath, 'index.js'),
  devtool: argv.production ? undefined : 'eval',
  output: {
    path: buildPath,
    filename: `files/main${nameSuffix}.js`,
    publicPath: `/${argv.production ? packageJson.name : ''}`,
    pathinfo: false
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.svg'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  module: {
    rules: [
      argv.production ? {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread',
            ['transform-runtime', {
              polyfill: false,
              regenerator: true
            }]
          ]
        }
      } : undefined,
      {
        test: /\.(ttf|eot|woff)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }, {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: argv.production,
              sourceMap: !argv.production
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: !argv.production,
              plugins: () => [autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
              })]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: !argv.production
            }
          }]
      }].filter((item) => item !== undefined)
  },
  plugins: [
    new CleanWebpackPlugin([join('docs', '*')], {
      root: projectPath,
      verbose: false,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: `files/main${nameSuffix}.css`
    }),
    new HtmlWebpackPlugin({
      template: join(sourcePath, 'index.html'),
      filename: 'index.html',
      minify: true
    }),
    argv.watch ? new LiveReloadPlugin({
      appendScriptTag: true,
      ignore: /.(config|ico|js|json|html|template|woff)$/
    }) : undefined,
    argv.production ? new UglifyJsPlugin({
      sourceMap: false
    }) : undefined
  ].filter((item) => item !== undefined),
  stats: {
    assetsSort: 'size',
    children: false,
    entrypoints: false,
    hash: false,
    version: false
  }
};
