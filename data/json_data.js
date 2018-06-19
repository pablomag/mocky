const winston = require('winston');
const rp = require('request-promise');

const getClients = new Promise((resolve) =>
{
	const options = {
		uri: 'http://www.mocky.io/v2/5808862710000087232b75ac',
		headers: { 'User-Agent': 'Request-Promise' },
		json: true
	};

	rp(options)
		.then(res =>
		{
			winston.log('Client list retrieved');
			resolve(res);
		})
		.catch(err => { winston.error(err, 'Could not connect to data source'); });
});

const getPolicies = new Promise((resolve) =>
{
	const options = {
		uri: 'http://www.mocky.io/v2/580891a4100000e8242b75c5',
		headers: { 'User-Agent': 'Request-Promise' },
		json: true
	};

	rp(options)
		.then(res =>
		{
			winston.log('Policies list retrieved');
			resolve(res);
		})
		.catch(err => { winston.error(err, 'Could not connect to data source'); });
});

function getPolicyById(id, data)
{
	return data.policies.find(p => p.id === id);
}

function getClientById(id, data)
{
	return data.clients.find(c => c.id === id);
}

function getClientByName(name, data)
{
	return data.clients.find(c => c.name.toLowerCase() === name.toLowerCase());
}

function getClientByPolicy(policy, data)
{
	return data.clients.find(c => c.id === policy.clientId);
}

function getPoliciesByClient(client, data)
{
	return data.policies.filter(p => p.clientId === client.id);
}

module.exports.getClients = getClients;
module.exports.getPolicies = getPolicies;
module.exports.getPolicyById = getPolicyById;
module.exports.getClientById = getClientById;
module.exports.getClientByName = getClientByName;
module.exports.getClientByPolicy = getClientByPolicy;
module.exports.getPoliciesByClient = getPoliciesByClient;
