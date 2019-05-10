const express = require('express')
const fs = require('fs')
const path = require('path')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-entry.js').default  // 因为导出的时候是用es6的export default

const app = express()


//静态文件不需要走ssr
app.use('/public',express.static(path.join(__dirname, '../dist')))

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry);
    const str = template.replace('<app></app>', appString)
    res.send(str)
})

app.listen(3333, function () {
    console.log('server is listening on port 3333')
})
