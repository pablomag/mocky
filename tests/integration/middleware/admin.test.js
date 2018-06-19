const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');

let server;

let client = {
	id: 1,
	name: 'Name',
	email: 'Email',
	role: 'admin'
};

let policy = {
	id: "64cceef9-3a01-49ae-a23b-3761b604800b"
}

describe('auth middleware', () =>
{
	function generateAuthToken(client)
	{
		return token = jwt.sign(client, config.get('jwtPrivateKey'));
	}

	beforeAll(() => {
		server = require('../../../index');
	});
	afterAll(async () => {
		await server.close();
	});

	const exec = () =>
	{
		const token = generateAuthToken(client);

		return request(server)
			.post('/api/client/policy/' + policy.id)
			.set('x-auth-token', token)
			.send();
	};

	it('should return access denied if role is not admin', async () =>
	{
		client.role = 'user';

		const res = await exec();

		expect(res.status).toBe(403);
	});

	it('should return access denied if role is not user', async () =>
	{
		client.role = 'guest';

		const res = await exec();

		expect(res.status).toBe(403);
	});
});
