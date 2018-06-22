const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const user = require('../middleware/user');

const express = require('express');
const router = express.Router();

const Clients = require('../../client/index');
const Policies = require('../../policy/index');

router.post('/client/id/:id', [auth, user], async (req, res, next) =>
{
	const id = req.params.id;

	try {
		const queryClient = await Clients.getClients;
		const client = Clients.getClientById(id, queryClient);

		if (!client ? res.send('No results') : res.send(client));
	} catch (err) { next(err); }
});

router.post('/client/name/:name', [auth, user], async (req, res, next) =>
{
	const name = req.params.name;

	try {
		const queryClient = await Clients.getClients;
		const client = Clients.getClientByName(name, queryClient);

		if (!client ? res.send('No results') : res.send(client));
	} catch (err) { next(err); }
});

router.post('/client/policy/:policy', [auth, admin], async (req, res, next) =>
{
	const id = req.params.policy;

	try {
		const queryPolicy = await Policies.getPolicies;
		const policy = Policies.getPolicyById(id, queryPolicy);

		if (!policy) res.send('Policy not found');

		const queryClient = await Clients.getClients;
		const policyClient = Clients.getClientByPolicy(policy, queryClient);

		if (policyClient.length < 1 ? res.send('INCONSISTENCY ERROR: No client found for this policy') : res.send(policyClient));
	} catch (err) { next(err); }
});

module.exports = router;
