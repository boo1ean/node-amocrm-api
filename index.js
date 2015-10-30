var asssert = require('assert');
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
			createContact: 'post /private/api/v2/json/contacts/set'
		},

		before: {
			createTask: prepareCreateTaskRequest,
			createContact: prepareCreateContactRequest
		},
		parse: {
			auth: storeAuth,
			createTask: parseCreateTask,
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

function prepareCreateTaskRequest (params, requestBody, opts) {
	requestBody = { request: { tasks: { add: [params] } } };
	return [params, requestBody, opts];
}

function prepareCreateContactRequest (params, requestBody, opts) {
	requestBody = { request: { contacts: { add: [params] } } };
	return [params, requestBody, opts];
}

function parseCreateTask (res) {
	if (!res.data.response.tasks.add.length || res.status !== 200) {
		throw new Error('Task is not added due to some error');
	}

	return res.data.response.tasks.add[0];
}

function parseCreateContact (res) {
	if (!res.data.response.contacts.add.length || res.status !== 200) {
		throw new Error('Task is not added due to some error');
	}

	return res.data.response.contacts.add[0];
}
