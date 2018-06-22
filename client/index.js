const Client = require('./client');
const Data = require('../web/data/client');

module.exports =
{
	getClients: Data.getClients,
	getClientById: Client.getClientById,
	getClientByName: Client.getClientByName,
	getClientByPolicy: Client.getClientByPolicy
}
