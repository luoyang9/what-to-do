var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/todo.controller.js');


//Get all todos
router.route('/todos').get(TodoController.getTodos);

//Add a todo
router.route('/todos').post(TodoController.addTodo);

//Delete a todo
router.route('/todos/:cuid').delete(TodoController.deleteTodo);

module.exports = router;