const path = require('path')

const config = {
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: "/public/", // 1.用来区分静态资源和api 2.线上静态资源部署cdn，方便，直接在/public前面加前缀就行了
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                enforce: "pre",
                loader: 'eslint-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ],
            },
            // {
            //     enforce: 'pre',
            //     test: /.(js|jsx)$/,
            //     loader: 'eslint-loader',
            //     exclude: [
            //         path.resolve(__dirname, '../node_modules')
            //     ]
            // },
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
