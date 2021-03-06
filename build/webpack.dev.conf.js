var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//  TODO what did this do ?
var HtmlHardDisk = require('html-webpack-harddisk-plugin');
var fs = require('fs-extra');
var path = require('path');
// var MyPlugin = require('./htmlPlugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// add hot-reload related code to entry chunks

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

// console.log(path.resolve(__dirname, '../src/views/music/assets'));
// console.log(path.resolve(__dirname, '../dist/music'));
// var pages = utils.getEntries('./src/views/**/main.js');
module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: true}).concat([
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: utils.assetsPath(`img/[name].[ext]`)
                },
                include: /nobase64/
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath(`img/[name].[ext]`)
                    // name: `./img/[name].[${config.prefix}].[ext]`
                },
                exclude: /icons|nobase64/
            },
            {
                test: /\.(woff)(\?.*)?$/,
                loader: 'file-loader'
            }
        ])
    },
    mode: 'development',
    resolve: {

    },
    externals: {
        vue: 'Vue'
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#source-map',
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath(`js/[name].js`),
        chunkFilename: utils.assetsPath(`js/[name].js`)
        // library: 'webpackNumbers',
        // libraryTarget: 'this'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].css')
            //  allChunks: true
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),

        //  new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: 'index.html',
        //   inject: true
        // }),
        /* new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        }), */

        new FriendlyErrorsPlugin(),
        /* new webpack.ProvidePlugin({
            d3: 'd3'
        })*/
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, `../static`),
                to: path.resolve(config.dev.assetsPublicPath, `/dist/static`)
            }
            // Object.keys(pages).map(page => {
            //     return {
            //         from: path.resolve(__dirname, `../src/views/${page}/assets`),
            //         to:  path.resolve(config.dev.assetsPublicPath, `/static/`),
            //         //ignore: ['.*']
            //     }
            // })
        ])
    ],
    optimization: {
        /*
        作用域提升插件
            [注意] 这个插件在 mode: production 时时默认开启的
            这样配置时为了在 development 时也开启
            https://webpack.js.org/configuration/optimization/#optimizationconcatenatemodules
        */
        concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        // warnings: false
                    },
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: {
                    autoprefixer: {
                        browsers: 'last 2 version, IE > 8'
                    }
                }
            })
        ]
    }
});

var conf = {
    alwaysWriteToDisk: true,
    filename: 'index.html',
    template: path.resolve(__dirname, `../src/index.html`), // 模板路径
    inject: false,
    excludeChunks: [],
    baseUrl: '',
    currentEnv: 'development',
    envName: 'local',
    curentBranch: ''
};
// 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
module.exports.plugins.push(new HtmlWebpackPlugin(conf));

module.exports.plugins.push(new HtmlHardDisk());
