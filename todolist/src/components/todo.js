import React, {Component} from 'react';

class Todo extends Component {
    render() {
        const { text, completed} = this.props;
        return (
            <div style={{textDecoration: completed ? "line-through" : "none"}}
                onClick={this.handleClick}
            >
                {text}
            </div>
        );
    }

    handleClick(){

    }
}

export default Todo;
