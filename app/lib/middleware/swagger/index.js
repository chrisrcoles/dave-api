const swaggerTools = require('swagger-tools');
const yaml = require('yamljs');

const swaggerDoc = yaml.load(global.__basedir + '/api/swagger/swagger.yaml');
const validateResponse = false;

const options = {
  controllers: global.__basedir + '/api/resources/v1/',
  useStubs: false,
  debug: true
};


module.exports = (app) => {
  swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerValidator({ validateResponse }));
    app.use(middleware.swaggerRouter(options));
    app.use(middleware.swaggerUi());
  })
};
