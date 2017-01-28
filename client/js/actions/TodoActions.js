import callAPI from '../../util/api';

//action constants
export const FETCH_TODOS = 'FETCH_TODOS'
export const FETCH_TODOS_FULFILLED = 'FETCH_TODOS_FULFILLED'
export const CREATE_TODO = 'CREATE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const OPEN_TODO = 'OPEN_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function fetchTodos() {
	return (dispatch) => {
		dispatch({
			type: FETCH_TODOS
		});
		return callAPI('todos').then(res => {
			dispatch(fetchTodosFulfilled(res.todos));
		});
	}
}

export function fetchTodosFulfilled(todos) {
	return {
		type: FETCH_TODOS_FULFILLED,
		payload: {
			todos
		}
	}
}

export function createTodo(todo) {
	return {
		type: CREATE_TODO,
		payload: {
			todo
		}
	}
}

export function createTodoRequest(todo) {
	return (dispatch) => {
		return callAPI('todos', 'POST', {
			todo: {
				text: todo.text,
				tags: todo.tags
			}
		}).then(res => dispatch(createTodo(res.todo)));
	}
}

export function completeTodo(id) {
	return {
		type: COMPLETE_TODO,
		payload: {
			id
		}
	}
}

export function completeTodoRequest(id) {
	return (dispatch) => {
		return callAPI(`todos/${id}/complete`, 'PATCH', {
			complete: true
		}).then(() => dispatch(completeTodo(id)));
	}
}

export function openTodo(id) {
	return {
		type: OPEN_TODO,
		payload: {
			id
		}
	}
}

export function openTodoRequest(id) {
	return (dispatch) => {
		return callAPI(`todos/${id}/complete`, 'PATCH', {
			complete: false
		}).then(() => dispatch(openTodo(id)));
	}
}

export function deleteTodo(id) {
	return {
		type: DELETE_TODO,
		payload: {
			id
		}
	}
}

export function deleteTodoRequest(id) {
	return (dispatch) => {
		return callAPI(`todos/${id}`, 'DELETE').then(() => dispatch(deleteTodo(id)));
	}
}