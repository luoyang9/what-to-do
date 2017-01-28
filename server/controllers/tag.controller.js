var Tag = require('../models/tag.js');
var sanitizeHtml = require('sanitize-html');

module.exports = { 

	/** 
	 * Create new tag
	 *
	 * @param req
	 * @param res
	 * @returns	void
	 */
	createTag: function(req, res) {
		if (!req.body.tag.name) {
	 		res.status(403).end();
		}

		const newTag = new Tag(req.body.tag);

		newTag.name = sanitizeHtml(newTag.name);

		newTag.save(function(err, saved) {
			if(err) {
				res.status(500).send(err);
			}
			res.json({tag: saved});
		})
	}

};