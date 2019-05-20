import React from 'react'
// import { Router } from 'react-router-dom'
import getRouter from '../router/index'

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }


  render() {
    return (
      <div>
        {getRouter()}
      </div>

    )
  }
}

