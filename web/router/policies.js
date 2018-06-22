const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const express = require('express');
const router = express.Router();

const Clients = require('../../client/index');
const Policies = require('../../policy/index');

router.post('/policies/client/:name', [auth, admin], async (req, res, next) =>
{
	const name = req.params.name;

	try {
		const queryClient = await Clients.getClients;
		const client = Clients.getClientByName(name, queryClient);

		if (!client) res.send('Client not found');

		const queryPolicy = await Policies.getPolicies;
		const clientPolicies = Policies.getPoliciesByClient(client, queryPolicy);

		if (clientPolicies.length < 1 ? res.send('No policies found for this client') : res.send(clientPolicies));
	} catch (err) { next(err); }
});

module.exports = router;
