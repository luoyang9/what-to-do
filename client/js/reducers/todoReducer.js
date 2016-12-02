
import { FETCH_TODOS, FETCH_TODOS_FULFILLED, CREATE_TODO, COMPLETE_TODO, OPEN_TODO, DELETE_TODO } from '../actions/TodoActions';

//Initial state
const initialState = {
	todos: [],
	fetching: false
}

const todoReducer = (state=initialState, action) => {
	switch(action.type) {
		case FETCH_TODOS: {
			return {
				fetching: true
			};
		}
		case FETCH_TODOS_FULFILLED: {
			return {
				todos: action.payload.todos,
				fetching: false
			};
		}
		case CREATE_TODO: {
			return {
				todos: [
					...state.todos, 
					{...action.payload.todo}
				]
			};
		}
		case COMPLETE_TODO: {
			return {
				todos: state.todos.map((todo) => {
					if(todo.cuid === action.payload.cuid) return {...todo, complete: true};
					else return todo;
				})
			};
		}
		case OPEN_TODO: {
			return {
				todos: state.todos.map((todo) => {
					if(todo.cuid === action.payload.cuid) return {...todo, complete: false};
					else return todo;
				})
			}
		}
		case DELETE_TODO: {
			return {
				todos: state.todos.filter( (todo) => todo.cuid !== action.payload.cuid )
			};
		}
	}
	return state;
}

export default todoReducer;