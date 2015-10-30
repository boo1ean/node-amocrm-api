## AmoCRM API client for nodejs

Simplified API client for [AmoCRM](https://amocrm.ru) api.

## Installation

```
npm install amocrm-api
```

## Usage

```javascript
var amo = require('amorcm-api');

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

Create task and assign it to responsible user (see [official doc](https://developers.amocrm.ru/rest_api/tasks_set.php) for extended usage.

```javascript
amo.createTask({
	task_type: 1,
	text: 'Task text',
	responsible_user_id: 123,
	complete_till: new Date().getTime()
});
```
