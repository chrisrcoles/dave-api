'use strict';

const {
	BearSighting
} = require('../../../../db/models/index');

module.exports = (req, res) => {
	const id = req.swagger.params.id.value;

	BearSighting.findById(id)
		.then(bearSighting => {
			return res.status(200).send(bearSighting)
		})
		.catch(err => {
			let errors = [];
			errors.push({err, message: `Error getting bear sightings.`});

			return res.status(404).send({errors});
		})
};
