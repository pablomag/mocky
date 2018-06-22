const winston = require('winston');
const rp = require('request-promise');

module.exports.getClients = new Promise((resolve) =>
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
