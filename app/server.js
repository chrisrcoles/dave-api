'use strict';

require('dotenv').load();

const express = require('express');
global.__basedir = __dirname;
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/models/index');
const defineMiddleware = require('./lib/middleware/index');

const APP = {};
APP.START_TIME = +new Date();
app.use(bodyParser.json());


db.sequelize.sync({force: false})
  .then(() => {
    defineMiddleware(app);
    app.listen(process.env.APP_PORT, () => {
      console.log(`Dave-API listening on port ${process.env.APP_PORT}`)
    })
  })
  .catch(err => {
    console.log('can\'t start server', err);
    process.exit();
  });



exports.app = APP;
