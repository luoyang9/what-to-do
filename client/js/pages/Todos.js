import React from "react";
import { List, ListItem } from 'material-ui/List';
import CheckBox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'

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
			text: this.state.newTodo
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

	render() {
		const { todos, fetching } = this.props;

		const TodoItems = todos ? todos.map((todo) => {
			return <ListItem key={todo.cuid} 
							leftCheckbox={<CheckBox onCheck={this.todoCheckHandler.bind(this, todo.cuid)} />} 
							rightIcon={<ActionDelete onTouchTap={this.deleteTodo.bind(this, todo.cuid)} style={{height: 24}}/>}>
				<p style={this.getTodoStyle(todo.complete)}>{todo.text}</p>
			</ListItem>;
		}) : null;

		return (
			<div>
				<TextField fullWidth={true} value={this.state.newTodo} onChange={this.textFieldHandler.bind(this)} floatingLabelText="New Todo"/>
				<RaisedButton onTouchTap={this.createTodo.bind(this)} label="Create Todo" primary={true} style={{marginTop: 15}}/>
				<h1>Todos</h1>
				<List>
					{TodoItems}
				</List>
			</div>
		);
	}
}
