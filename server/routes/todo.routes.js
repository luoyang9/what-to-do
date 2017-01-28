var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/todo.controller.js');


//Get all todos
router.route('/').get(TodoController.getTodos);

//Add a todo
router.route('/').post(TodoController.addTodo);

//Delete a todo
router.route('/:_id').delete(TodoController.deleteTodo);

//Update a todo's 'complete' status
router.route('/:_id/complete').patch(TodoController.updateCompleteTodo);

module.exports = router;