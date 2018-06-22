const winston = require('winston');
const rp = require('request-promise');

module.exports.getPolicies = new Promise((resolve) =>
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
