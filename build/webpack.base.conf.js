var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader')
var chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // entry: {
  //   app: './src/main.js'
  // },
  entry: utils.getEntries('./src/views/**/main.js'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.less'],
    alias: {
      //'vue$': 'vue/dist/vue.js',
      '@': resolve('src'),
      'src': resolve('src')
    }
  },
  module: {
    rules: [
    //   {
    //     test: /\.(js|vue)$/,
    //     loader: 'eslint-loader',
    //     enforce: "pre",
    //     include: [resolve('src'), resolve('test')],
    //     options: {
    //       formatter: require('eslint-friendly-formatter')
    //     }
    //   },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
    //   {
    //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //     loader: 'url-loader',
    //     query: {
    //       limit: 10000,
    //       name: utils.assetsPath(`../img/[name].[${config.prefix}].[ext]`)
    //       //name: `./img/[name].[${config.prefix}].[ext]`
    //     },
    //     exclude: /icons/
    //   },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'svg-sprite-loader',
        query: {
            prefixize: true,
            name: '[name]-[hash]'
        },
        include: [resolve('src')],
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds) : (:msg)',
      clear: false,
      width: 60
    })
  ]
}
