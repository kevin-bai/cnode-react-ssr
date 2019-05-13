const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const memoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware') // express 代理中间件
const ReactDomServer = require('react-dom/server')

const getTemplate = () => {
    return new Promise(((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html').then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    }))
}

const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig)
const mfs = new memoryFs //坑点 不是new memoryFs()


let severBundle;

serverCompiler.outputFileSystem = mfs // 把webpack的outputFileSystem 从在硬盘的读写，换成在内存读写
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;

    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.log(warn))

    const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
    const bundle = mfs.readFileSync(bundlePath,'utf8') // 注意bundle是string，不是js。不能直接用


    // ----------load js module from string to memory------
    const Module = module.constructor
    const m = new Module()
    m._compile(bundle,'server-entry.js')
    // const severBundle = m.default  // .default 因为这个module文件是es6导出的，如果是node.js模块导出，可以用exports

    severBundle = m.exports.default; // 存在全局变量


    // console.log(severBundle)

})

module.exports = (app) => {

    // 和server.js中类似的坑，app.get('*')
    app.use('/public',proxy({
        target:'http://localhost:8888'
    }))


    app.get('*', (req, res) => {
        getTemplate().then(template =>{

            if (!severBundle) {
                res.send('waiting for compiling, refresh the page later!')
            }

            const appString = ReactDomServer.renderToString(severBundle);
            const str = template.replace('<!-- app -->', appString)
            res.send(str)
        })
    })

}
