const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const config = require('config');

const jsonData = require('../data/json_data');

router.post('/:id', async (req, res, next) =>
{
	const id = req.params.id;

	try {
		const clients = await jsonData.getClients;
		const client = jsonData.getClientById(id, clients);

		if (!client)
		{
			res.send('No client found');
		} else {

			const token = generateAuthToken(client);
			res.header('x-auth-token', token).send(token);
		}
	} catch (error) { next(error); }
});

function generateAuthToken(client)
{
	const token = jwt.sign(
	{
		id: client.id,
		role: client.role,
	}, config.get('jwtPrivateKey'));

	return token;
}

module.exports = router;
