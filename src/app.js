require('dotenv').config();
const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const logger = require('morgan');

const routes = require('./routes/index.js');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorhandler());

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api/v1', routes(router));

app.listen(stage.port, () => {
  console.log(`App listening on port ${stage.port} ...`);
});

module.exports = app;
