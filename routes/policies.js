const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const express = require('express');
const router = express.Router();

const jsonData = require('../data/json_data');

router.post('/policies/client/:name', [auth, admin], async (req, res, next) =>
{
	const name = req.params.name;

	try {
		await jsonData.getClients
		.then(async result =>
		{
			const clients = result;

			const client = jsonData.getClientByName(name, clients);

			if (!client) res.send('Client not found');

			await jsonData.getPolicies
				.then(result =>
				{
					const policies = result;

					const clientPolicies = jsonData.getPoliciesByClient(client, policies);

					if (clientPolicies.length < 1 ? res.send('No policies found for this client') : res.send(clientPolicies));
				})
				.catch(error => { next(error); });
		})
		.catch(error => { next(error); });
	} catch (error) { next(error); }
});

module.exports = router;
