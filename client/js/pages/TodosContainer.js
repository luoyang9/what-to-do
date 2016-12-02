import { connect } from 'react-redux'

import { createTodoRequest, fetchTodos, deleteTodoRequest, completeTodo, openTodo } from '../actions/TodoActions'
import Todos from './Todos'

const mapStateToProps = (state) => {
	return {
		todos: state.todoReducer.todos
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createTodo: (todo) => {
			dispatch(createTodoRequest(todo));
		},
		fetchTodos: () => {
			dispatch(fetchTodos());
		},
		deleteTodo: (id) => {
			dispatch(deleteTodoRequest(id));
		},
		completeTodo: (id) => {
			dispatch(completeTodo(id));
		},
		openTodo: (id) => {
			dispatch(openTodo(id))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Todos)