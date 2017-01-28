var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	text: { type: 'String', required: true },
	complete: { type: 'Boolean', required: true },
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Todo', todoSchema);