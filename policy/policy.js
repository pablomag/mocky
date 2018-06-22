function getPolicyById(id, data)
{
	return data.policies.find(p => p.id === id);
}

function getPoliciesByClient(client, data)
{
	return data.policies.filter(p => p.clientId === client.id);
}

module.exports.getPolicyById = getPolicyById;
module.exports.getPoliciesByClient = getPoliciesByClient;
