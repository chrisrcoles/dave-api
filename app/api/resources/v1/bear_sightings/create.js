const {
	BearSighting
} = require('../../../../db/models/index');

module.exports = (req, res) => {
	const payload = req.body;

	BearSighting.create(payload)
		.then(bearSighting => {
			return res.status(200).send(bearSighting)
		})
		.catch(err => {
			let errors = [];
			errors.push({err, message: `Error creating bear sighting.`});

			return res.status(404).send({errors});
		})
};
