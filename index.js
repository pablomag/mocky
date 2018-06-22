const express = require('express');
const app = express();

/* Error logger */
require('./config/components/errors')(app);

/* Config */
require('./config/components/config')();

/* Routes */
require('./config/components/routes')(app);

/* Server */
const winston = require('winston');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => winston.info(`Express server listening on ${port}`));

module.exports = server;
