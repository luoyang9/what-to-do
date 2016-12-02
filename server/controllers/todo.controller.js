var Todo = require('../models/todo.js');
var cuid = require('cuid');
var sanitizeHtml = require('sanitize-html');

module.exports = { 

	/** 
	 * Get all todos
	 *
	 * @param req
	 * @param res
	 * @returns	void
	 */
	getTodos: function(req, res) {
		Todo.find().exec(function(err, todos) {
			if(err) {
				res.status(500).send(err);
			}
			res.json({ todos });
		});
	},

	/** 
	 * Add a todo
	 *
	 * @param req
	 * @param res
	 * @returns	void
	 */
	addTodo: function(req, res) {
		if (!req.body.todo.text) {
	 		res.status(403).end();
		}

		const newTodo = new Todo(req.body.todo);

		newTodo.text = sanitizeHtml(newTodo.text);

		newTodo.complete = false;
		newTodo.cuid = cuid();
		newTodo.save(function(err, saved) {
			if(err) {
				res.status(500).send(err);
			}
			res.json({todo: saved});
		})
	},

	/**
	 * Delete a todo
	 * @param req
	 * @param res
	 * @returns void
	 */
	deleteTodo: function(req, res) {
	  Todo.findOne({ cuid: req.params.cuid }).exec(function(err, todo) {
	    if (err) {
	      res.status(500).send(err);
	    }

	    todo.remove(function(err, deleted) {
	    	if(err) {
	    		res.status(500).send(err);
	    	}
	    	res.json({todo: deleted});
	    });
	  });
	}

};