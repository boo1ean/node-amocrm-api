## AmoCRM API client for nodejs

Simplified API client for [AmoCRM](https://amocrm.ru).

## Installation

```
npm install amocrm-api
```

## Usage

```javascript
var AmoCRM = require('amocrm-api');
var amo = new AmoCRM('https://your-domain.amocrm.ru');

amo.auth({
	USER_LOGIN: 'your-email@example.com',
	USER_HASH: 'd10532200r202eefwa9c7eab290237a6'
}).then(function createSomeTasks () {
	return amo.createTask({
		task_type: 1,
		text: 'Task text',
		responsible_user_id: 123,
		complete_till: new Date().getTime()
	});
});
```

## Available methods

## auth

`auth` method should be used to initiate user session. You need to auth before doing any other request.

```javascript
amo.auth({
	USER_LOGIN: 'your-email@example.com',
	USER_HASH: 'd10532200r202eefwa9c7eab290237a6'
}).then(function doSomethingAuthorized () {
	//...
});
```

## createTask

Create task and assign it to responsible user. For extended usage see [official docs](https://developers.amocrm.ru/rest_api/tasks_set.php).

```javascript
amo.createTask({
	task_type: 1,
	text: 'Task text',
	responsible_user_id: 123,
	complete_till: new Date().getTime()
});
```

## createContact

Create contact. For extended usage see [official docs](https://developers.amocrm.ru/rest_api/contacts_set.php)

```javascript
amo.createContact({
	name: 'Вася Пупкин',
	responsible_user_id: 540759
}).then(function afterContactCreated (res) {
	console.log(res.id); // created contact id
});
```

## License

MIT
