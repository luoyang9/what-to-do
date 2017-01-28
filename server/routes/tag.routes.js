var express = require('express');
var router = express.Router();
var TagController = require('../controllers/tag.controller.js');

//Add a todo
router.route('/tag').post(TagController.createTag);

module.exports = router;