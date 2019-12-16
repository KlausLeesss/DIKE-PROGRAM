//客户端打包 base
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const HappyPackPool = HappyPack.ThreadPool({size: 5});
module.exports = {
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'HappyPack/loader?id=babel'
            },
            {
                test: /\.(png|woff|woff2|svg|eot|jpg)($|\?)/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype:'image/png',
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx",".ts",".tsx"],
        alias: {
            '&static': path.resolve(__dirname, '../src/static'),
            '&components': path.resolve(__dirname, '../src/components'),
            '&helpers': path.resolve(__dirname, '../src/helpers')
        }
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            threadPool: HappyPackPool,
            // cache: true,
            loaders: ['babel-loader','astroturf/loader']
        }),
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname, '..')
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
};