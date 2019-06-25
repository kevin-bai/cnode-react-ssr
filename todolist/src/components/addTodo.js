import React, {Component} from 'react';

class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange}/>
        <button onClick={this.handleClick}>add</button>
      </div>
    );
  }


  handleChange(){

  }

  handleClick(){

  }
}

export default AddTodo;
