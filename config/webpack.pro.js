//客户端代码打包 production
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const LessPluginFunctions = require('less-plugin-functions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//预渲染
// const PreRender = require('prerender-spa-plugin');

const config = webpackMerge(baseConfig, {
    mode: 'production',
    output: {
        publicPath: "./",
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    entry: {
        client: [path.resolve(__dirname, "../src/index.js")]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
              test: /\.(scss|sass)$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true
                  }
                },
                {
                  loader: 'postcss-loader'
                },
                {
                  loader: 'sass-loader'
                }
              ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            plugins: [
                                new LessPluginFunctions()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        namedModules: true,
        namedChunks: true,
        // 压缩js
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true,
                    ecma: 8
                }
            })
        ],
        // 抽离公用的js部分 , 配置自动提取node_modules里用到的模块如jquery
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /\.js$/,
                    chunks: "async", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    enforce: true
                },
            }
        }
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        // favicon: './client/static/image/logo.jpg',
        filename: "index.html",
        hash: true
        // loading: loading
      }),
      // new PreRender({
      //     staticDir: path.join(__dirname,'../dist'),
      //     routes: ['/']
      // }),
      new MiniCssExtractPlugin({ // 在plugins中配置属性
        filename: 'css/[name]-[contentHash].css', // 配置提取出来的css名称
        chunkFilename: "css/chunk-[id].css"
      }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        },
      })
    ]
});

module.exports = config;
