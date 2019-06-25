import React, {Component} from 'react';
import TodoList from './todoList'
import AddTodo from './addTodo'
import Footer from './footer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: ''
    }

  }

  render() {
    const todos = [
      {
        "id": 100,
        "text": "学习React",
        "completed": false
      },
      {
        "id": 101,
        "text": "学习Redux",
        "completed": false
      }
    ]
    const {filter} = this.state
    return (
      <div className="App">
        <AddTodo></AddTodo>
        <TodoList todos={todos}></TodoList>
        <Footer filter={filter}></Footer>
      </div>
    );
  }

  addTodo = text => {
    const todo = {
      text,
      completed: false
    }
    const todos = {
      ...this.state.todos,
      todo
    }
    this.state.set(
      {
        'todos': todos
      }
    )
  }
}


export default App;
