const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');

let server;
let client;

let clientFromJson = {
	id: "44e44268-dce8-4902-b662-1b34d2c10b8e",
	name: "Merrill",
	email: "merrillblankenship@quotezart.com",
	role: "user"
};

let policyFromJson = {
	id: "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
	amountInsured: 399.89,
	email: "inesblankenship@quotezart.com",
	inceptionDate: "2015-07-06T06:55:49Z",
	installmentPayment: true,
	clientId: "a0ece5db-cd14-4f21-812f-966633e7be86"
};

describe('/api/client/id/:id', () =>
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
			.post('/api/client/id/' + clientFromJson.id)
			.set('x-auth-token', token)
			.send();
	};

	it('should return access denied if role is not user or admin', async () =>
	{
		client.role = 'guest';

		const res = await exec();

		expect(res.status).toBe(403);
	});

	it('should return a matching object', async () =>
	{
		const res = await exec();

		expect(res.status).toBe(200);
		expect(res.body).toMatchObject(clientFromJson);
	});
});

describe('/api/client/name/:name', () =>
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
			.post('/api/client/name/' + clientFromJson.name)
			.set('x-auth-token', token)
			.send();
	};

	it('should return access denied if role is not user or admin', async () =>
	{
		client.role = 'guest';

		const res = await exec();

		expect(res.status).toBe(403);
	});

	it('should return a matching object', async () =>
	{
		const res = await exec();

		expect(res.status).toBe(200);
		expect(res.body).toMatchObject(clientFromJson);
	});
});

describe('/api/client/policy/:policy', () =>
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
			.post('/api/client/policy/' + policyFromJson.id)
			.set('x-auth-token', token)
			.send();
	};

	it('should return access denied if role is not admin', async () =>
	{
		client.role = 'user';

		const res = await exec();

		expect(res.status).toBe(403);
	});

	it('should return a client object with the matching clientId', async () =>
	{
		const res = await exec();

		expect(res.status).toBe(200);
		expect(res.body.id).toMatch(policyFromJson.clientId);
	});
});
