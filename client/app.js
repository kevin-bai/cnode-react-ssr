import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'

// render 改成 hydrate ，react16新出的api，会对比ssr和client的代码，如果不一样会认为不安全，用client的代码
ReactDom.hydrate(<App />, document.getElementById('root'))
