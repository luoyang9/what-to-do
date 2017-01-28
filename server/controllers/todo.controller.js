var Todo = require('../models/todo.js');
var Tag = require('../models/tag.js');
var _ = require('lodash');
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

		let { text, tags } = req.body.todo; 
		const newTodo = new Todo();

		newTodo.text = sanitizeHtml(text);
		newTodo.complete = false;

		let tagPartitions = _.partition(tags, function(tag) { 
			return !!tag._id; 
		});

		//create new tag documents for new tags
		Tag.create(tagPartitions[1], function(err, savedTags) {
			if(err) {
				res.status(500).send(err);
			}

			let tagIds = tagPartitions[0].concat(savedTags.map(function(tag) {
				return tag._id;
			}));
			newTodo.tags = tagIds;

			newTodo.save(function(err, saved) {
				if(err) {
					res.status(500).send(err);
				}
				res.json({todo: saved});
			});
		});
	},

	/**
	 * Update a todo's 'complete' status
	 * @param req
	 * @param res
	 * @returns void
	 */
	updateCompleteTodo: function(req, res) {
		Todo.update({ _id: req.params._id }, { complete: req.body.complete }, function(err, raw) {
			if(err) {
				res.status(500).send(err);
			}	
			res.status(204).end();
		})
	},

	/**
	 * Delete a todo
	 * @param req
	 * @param res
	 * @returns void
	 */
	deleteTodo: function(req, res) {
	  Todo.findById(req.params._id).exec(function(err, todo) {
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