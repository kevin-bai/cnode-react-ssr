import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {AppContainer} from 'react-hot-loader' // eslint-disable-line

import App from './views/App'

// render 改成 hydrate ，react16新出的api，会对比ssr和client的代码，如果不一样会认为不安全，用clent的代码
ReactDom.hydrate(<App />, document.getElementById('root'))

const root = document.getElementById('root')
const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>, root)
}

render(App)

// 配置hot module replacement
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./views/App.jsx').default; // eslint-disable-line
    render(NextApp)
  })
}
