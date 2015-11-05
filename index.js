var assert = require('assert');
var ApiClient = require('apiapi');

module.exports = function buildClient (baseUrl) {
	assert(typeof baseUrl === 'string', 'baseUrl must be string');
	
	return new ApiClient({
		baseUrl: baseUrl,
		methods: {
			auth: 'post /private/api/auth.php?type=json',

			getCurrentAccount: 'get /private/api/v2/json/accounts/current',

			getTasksList: 'get /private/api/v2/json/tasks/list',
			createTask: 'post /private/api/v2/json/tasks/set',

			getContactsList: 'get /private/api/v2/json/contacts/list',
			createContact: 'post /private/api/v2/json/contacts/set'
		},

		before: {
			createTask: prepareCreateTask,
			createContact: prepareCreateContact
		},
		parse: {
			auth: storeAuth,
			createTask: parseCreateTask,
			getCurrentAccount: parseGetCurrentAccount,
			getContactsList: parseContactsList,
			createContact: parseCreateContact
		}
	});
};

function storeAuth (res) {
	var cookies = res.headers['set-cookie'];

	if (!cookies) {
		throw new Error('AmoCRM auth failed');
	}

	this.headers.Cookie = cookies.map(parseCookie).join('; ');
	return res.data;

	function parseCookie (cookieHeader) {
		return cookieHeader.split(';')[0];
	}
}

function prepareCreateTask (params, requestBody, opts) {
	requestBody = { request: { tasks: { add: [params] } } };
	return [params, requestBody, opts];
}

function prepareCreateContact (params, requestBody, opts) {
	requestBody = { request: { contacts: { add: [params] } } };
	return [params, requestBody, opts];
}

function parseCreateTask (res) {
	assert(res.data.response.tasks.add.length && res.status === 200, 'Task is not added due to some error');
	return res.data.response.tasks.add[0];
}

function parseCreateContact (res) {
	assert(res.data.response.contacts.add.length && res.status === 200, 'Contact is not created due to some error');
	return res.data.response.contacts.add[0];
}

function parseGetCurrentAccount (res) {
	assert(res.data.response.account && res.status === 200, 'Can\'t get current account info for some reason');
	return res.data.response.account;
}

function parseContactsList (res) {
	assert(res.data.response.contacts && res.status === 200, 'Contacts list query error');
	return res.data.response.contacts;
}
