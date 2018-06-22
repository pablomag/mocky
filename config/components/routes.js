const express = require('express');

const auth = require('../../web/router/auth');
const clients = require('../../web/router/clients');
const policies = require('../../web/router/policies');

module.exports = function(app)
{
	/* Middleware */
	app.use(express.json());

	/* Routes */
	app.use('/api/auth', auth);
	app.use('/api', clients);
	app.use('/api', policies);
}
