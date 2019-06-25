import React, {Component} from 'react';
import Todo from './todo'

class TodoList extends Component {
    render() {
        const {todos} = this.props

        return (
            <ul>
                {
                    todos.map( todo =>{
                      return  <Todo key={todo.id} {...todo}></Todo>
                    })
                }
            </ul>
        );
    }
}

export default TodoList;
