const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV ==='development'

const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.join(__dirname, '../dist'),
        publicPath: "/public/" // 1.用来区分静态资源和api 2.线上静态资源部署cdn，方便，直接在/public前面加前缀就行了
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

if (isDev){
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.entry = {
        app:[
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host:'0.0.0.0',
        port:'8888',
        contentBase:path.join(__dirname,'../dist'), // 在dist目录启动整个服务
        hot:true,
        overlay:{ // 报错浏览器出现黑色蒙层
            errors:true
        },
        publicPath: '/public',
        historyApiFallback:{ // 所有404的请求，都返回public/index.html这个路径
            index:'/public/index.html'
        }
    }
}

module.exports = config
