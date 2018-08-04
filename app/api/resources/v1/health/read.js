const { app } = require('../../../../server');

module.exports = (req, res) => {
	const now = +new Date();
	const uptime = now - app.START_TIME;

	res.setHeader('Content-Type', 'application/json');
	res.status(200).send({
		uptime,
		env: process.env.NODE_ENV,
		// commit: process.env.CURRENT_GIT_COMMIT,
		rand: Math.floor(Math.random() * 10000000),
	});
};
