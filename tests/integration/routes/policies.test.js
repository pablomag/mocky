const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');

let server;
let client;
let clientFromJson = {
	id: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
	name: "Manning",
	email: "manningblankenship@quotezart.com",
	role: "admin"
};

describe('/api/policies/client/:name', () =>
{
	function generateAuthToken(client)
	{
		return token = jwt.sign(client, config.get('jwtPrivateKey'));
	}

	beforeAll(() => {
		server = require('../../../index');
	});
	beforeEach(() => {
		client = {
			id: 1,
			name: 'Name',
			email: 'Email',
			role: 'admin'
		};
	});
	afterAll(async () => {
		await server.close();
	});

	const exec = () =>
	{
		const token = generateAuthToken(client);

		return request(server)
			.post('/api/policies/client/' + clientFromJson.name)
			.set('x-auth-token', token)
			.send();
	};

	it('should return access denied if role is not admin', async () =>
	{
		client.role = 'user';

		const res = await exec();

		expect(res.status).toBe(403);
	});

	it('should return a collection of objects policies// with a matching clientId', async () =>
	{
		const res = await exec();

		expect(res.status).toBe(200);
		expect(res.body.length).toBeGreaterThan(0);
		expect(res.body[0].clientId).toMatch(clientFromJson.id);
	});
});
