import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'
import {AppContainer} from 'react-hot-loader'

// render 改成 hydrate ，react16新出的api，会对比ssr和client的代码，如果不一样会认为不安全，用clent的代码
ReactDom.hydrate(<App/>, document.getElementById('root'))

const root = document.getElementById('root')
const render = Component => {
    ReactDom.hydrate(
        <AppContainer>
            <Component/>
        </AppContainer>, root)
}

render(App)

// 配置hot module replacement
if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default
        render(NextApp)
    })
}
