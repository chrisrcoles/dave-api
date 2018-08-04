const glob = require('glob');
const middleware = glob.sync(__dirname + '/*/*.js');

module.exports = (app) => middleware.forEach(middleware => require(middleware)(app));
