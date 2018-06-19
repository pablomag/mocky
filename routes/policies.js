const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const express = require('express');
const router = express.Router();

const jsonData = require('../data/json_data');

router.post('/policies/client/:name', [auth, admin], async (req, res, next) =>
{
	const name = req.params.name;

	try {
		const clients = await jsonData.getClients;
		const client = jsonData.getClientByName(name, clients);

		if (!client) res.send('Client not found');

		const policies = await jsonData.getPolicies;
		const clientPolicies = jsonData.getPoliciesByClient(client, policies);

		if (clientPolicies.length < 1 ? res.send('No policies found for this client') : res.send(clientPolicies));
	} catch (err) { next(err); }
});

module.exports = router;
