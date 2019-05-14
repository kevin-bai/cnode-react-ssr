const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')

const app = express()

const isDev = process.env.NODE_ENV === 'development'
app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
  const serverEntry = require('../dist/server-entry.js').default  // 因为导出的时候是用es6的export default

  // 因为app.get('*'),要刨除静态文件不走服务端渲染
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  //静态文件不需要走ssr
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry);
    const str = template.replace('<!-- app -->', appString)
    res.send(str)
  })

} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)

}

app.listen(3333, function () {
  console.log('server is listening on port 3333')
})
