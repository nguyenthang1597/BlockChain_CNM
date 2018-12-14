const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
require('./config/express')(app, logger, express, cookieParser, path);
require('./config/mongoose')
require('./routes')(app);

require('./lib/api/getAllBlock');


module.exports = app;
