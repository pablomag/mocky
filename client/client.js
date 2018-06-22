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

module.exports.getClientById = getClientById;
module.exports.getClientByName = getClientByName;
module.exports.getClientByPolicy = getClientByPolicy;
