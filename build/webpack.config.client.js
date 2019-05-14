const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: "[name].[hash:8].js",
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /.(js | jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }]
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
})

if (isDev) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'), // 在dist目录启动整个服务
        hot: true,
        overlay: { // 报错浏览器出现黑色蒙层
            errors: true
        },
        publicPath: '/public',
        historyApiFallback: { // 所有404的请求，都返回public/index.html这个路径
            index: '/public/index.html'
        }
    }
}

module.exports = config
