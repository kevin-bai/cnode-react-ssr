const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
    target: "node", // node执行环境 ,另一个配置项是web
    entry: {
        app: path.join(__dirname, '../client/server.entry.js')
    },
    output: {
        filename: "server-entry.js",
        path: path.join(__dirname, '../dist'),
        publicPath: "/public", // 1.用来区分静态资源和api 2.线上静态资源部署cdn，方便，直接在/public前面加前缀就行了
        libraryTarget: "commonjs2" // 模块加载规范
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader',
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }

        ]
    }
}

module.exports = config
