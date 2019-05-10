const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.join(__dirname, '../dist'),
        publicPath: "/public" // 1.用来区分静态资源和api 2.线上静态资源部署cdn，方便，直接在/public前面加前缀就行了
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
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
}

module.exports = config
