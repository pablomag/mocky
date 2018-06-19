const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const user = require('../middleware/user');

const express = require('express');
const router = express.Router();

const jsonData = require('../data/json_data');

router.post('/client/id/:id', [auth, user], async (req, res, next) =>
{
	const id = req.params.id;

	try {
		const clients = await jsonData.getClients;
		const client = jsonData.getClientById(id, clients);

		if (!client ? res.send('No results') : res.send(client));
	} catch (err) { next(err); }
});

router.post('/client/name/:name', [auth, user], async (req, res, next) =>
{
	const name = req.params.name;

	try {
		const clients = await jsonData.getClients;
		const client = jsonData.getClientByName(name, clients);

		if (!client ? res.send('No results') : res.send(client));
	} catch (err) { next(err); }
});

router.post('/client/policy/:policy', [auth, admin], async (req, res, next) =>
{
	const id = req.params.policy;

	try {
		const policies = await jsonData.getPolicies;
		const policy = jsonData.getPolicyById(id, policies);

		if (!policy) res.send('Policy not found');

		const clients = await jsonData.getClients;
		const policyClient = jsonData.getClientByPolicy(policy, clients);

		if (policyClient.length < 1 ? res.send('INCONSISTENCY ERROR: No client found for this policy') : res.send(policyClient));
	} catch (err) { next(err); }
});

module.exports = router;
