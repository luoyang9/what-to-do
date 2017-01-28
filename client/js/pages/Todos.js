import React from "react";
import { List, ListItem } from 'material-ui/List';
import CheckBox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import "../../stylesheets/todos.scss";

export default class Todos extends React.Component{

	componentWillMount() {
		this.props.fetchTodos();
		this.setState({
			newTodo: ""
		})
	}

	static fetchData(store) {
		return
	}

	createTodo() {
		this.props.createTodo({
			text: this.state.newTodo,
			tags: [{name:"Tag1"}, {name:"Tag2"}]
		});
		this.setState({
			newTodo: ""
		})
	}

	deleteTodo(id) {
		this.props.deleteTodo(id);
	}

	textFieldHandler(e) {
		this.setState({
			newTodo: e.target.value
		});
	}

	todoCheckHandler(id, e) {
		if(e.target.checked) this.props.completeTodo(id);
		else this.props.openTodo(id);
	}

	getTodoStyle(complete) {
		if(complete) return {
			textDecoration: "line-through",
			color: "#878787"
		}
	}

	renderTodos(todos) {
		return this.filterTodos(todos).map(todo => {
			return <ListItem key={todo._id} 
							leftCheckbox={<CheckBox checked={todo.complete} onCheck={this.todoCheckHandler.bind(this, todo._id)} />} 
							rightIcon={<ActionDelete onTouchTap={this.deleteTodo.bind(this, todo._id)} style={{height: 24}}/>}>
				<p style={this.getTodoStyle(todo.complete)}>{todo.text}</p>
			</ListItem>;
		})
	}

	filterTodos(todos) {
		return todos.filter(todo => {
			return true;
		});
	}

	render() {
		const { todos, fetching } = this.props;

		const FetchingText = <p> Loading todos... </p>;
		const TodoItems = todos ? this.renderTodos(todos) : null;

		return (
			<div>
				<TextField fullWidth={true} value={this.state.newTodo} onChange={this.textFieldHandler.bind(this)} floatingLabelText="New Todo"/>
				<RaisedButton onTouchTap={this.createTodo.bind(this)} label="Create Todo" primary={true} style={{marginTop: 15}}/>
				<h1>Todos</h1>
				<List>
					{fetching ? FetchingText : TodoItems}
				</List>
			</div>
		);
	}
}
