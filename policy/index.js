const Policy = require('./policy');
const Data = require('../web/data/policy');

module.exports =
{
	getPolicies: Data.getPolicies,
	getPolicyById: Policy.getPolicyById,
	getPoliciesByClient: Policy.getPoliciesByClient
}
