const express = require('express');

const auth = require('../routes/auth');
const clients = require('../routes/clients');
const policies = require('../routes/policies');

module.exports = function(app)
{
	/* Middleware */
	app.use(express.json());

	/* Routes */
	app.use('/api/auth', auth);
	app.use('/api', clients);
	app.use('/api', policies);
}
