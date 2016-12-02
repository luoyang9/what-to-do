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
		return callAPI('todos', 'post', {
			todo: {
				text: todo.text
			}
		}).then(res => dispatch(createTodo(res.todo)));
	}
}

export function completeTodo(cuid) {
	return {
		type: COMPLETE_TODO,
		payload: {
			cuid
		}
	}
}

export function openTodo(cuid) {
	return {
		type: OPEN_TODO,
		payload: {
			cuid
		}
	}
}

export function deleteTodo(cuid) {
	return {
		type: DELETE_TODO,
		payload: {
			cuid
		}
	}
}

export function deleteTodoRequest(cuid) {
	return (dispatch) => {
		return callAPI(`todos/${cuid}`, 'delete').then(() => dispatch(deleteTodo(cuid)));
	}
}