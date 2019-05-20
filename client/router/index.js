import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={TopicDetail} exact key="first" />
        <Route path="/list" exact component={TopicList} key="list" />
        <Route path="/detail" exact component={TopicDetail} key="detail" />
      </Switch>
    </BrowserRouter>
  )
}

