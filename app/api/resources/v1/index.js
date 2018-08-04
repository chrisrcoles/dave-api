const health = require('./health');
const bearSightings = require('./bear_sightings');

module.exports = {
	...health,
	...bearSightings
};
