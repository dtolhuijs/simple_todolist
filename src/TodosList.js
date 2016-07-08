import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import TodosListHeader from './TodosListHeader';
import TodosListItem from './TodosListItem';

class TodosList extends React.Component {
  constructor(){
    super();

    this.state = {
      message: "There are no task yet.",
      todos: []
    };
  }

  componentDidMount () {
    this.loadTodos();
  }

  loadTodos() {
    let component = this;

    jQuery.ajax({
      type: "GET",
      url: `https://calm-cove-62935.herokuapp.com/todos.json`,
      dataType: 'json',
      error: function(){
        console.log('Unable to load feed, Incorrect path or invalid feed');
      },
      success: function(data){
        component.setState({
          todos: data
        });

        console.log(component);
      }
    });
  }

  renderItems(){
    const props = _.omit(this.props, 'todos');

    return _.map(this.props.todos,
            (todo, index) => <TodosListItem key={index}
    {...todo} {...props} />
  );
  }

  render() {
    return (
      <table>
        <TodosListHeader />
        <tbody>{this.renderItems()}</tbody>
      </table>
  );
  }

  // renderTodoListItems(item, index) {
  //   return (
  //       <TodosListItem
  //           key={index}
  //       />
  //   );
  // }
  //
  // render() {
  //   let todos = this.state.todos;
  //
  //   return (
  //         <div>
  //           {todos.map(this.renderTodoListItems().bind(this))}
  //         </div>
  //   );
  // }
}

export default TodosList;
