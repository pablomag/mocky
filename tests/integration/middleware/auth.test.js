const request = require('supertest');
const auth = require('../../../routes/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

let server;

describe('auth middleware', () =>
{
	beforeAll(() => {
		server = require('../../../index');
	});
	afterAll(async () => {
		await server.close();
	});

	const exec = () =>
	{
		return request(server)
			.post('/api/client/id/' + 'id')
			.set('x-auth-token', token)
			.send();
	};

	it('should return 401 if no token is provided', async () =>
	{
		token = '';

		const res = await exec();

		expect(res.status).toBe(401);
	});

	it('should return 400 if token is invalid', async () =>
	{
		token = 'InvalidToken';

		const res = await exec();

		expect(res.status).toBe(400);
	});
});
