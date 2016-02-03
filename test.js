/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
*/

var AmoCRM = require('./index');
var amo = new AmoCRM('https://new56b0a9cc0e536.amocrm.ru');

function cb(res){
	console.log(res);
}

amo.auth({
	USER_LOGIN: 'mailvalid2@mail.ru',
	USER_HASH: '1160eb166bf05c180c8cf26ce425d452'
}).catch(cb).then(function(res){
	cb(res);
	amo.getCurrentAccount().then(function(res){
		console.log(res.custom_fields.contacts)
	}).catch(cb);
	// amo.createContact({
	// 	name: 'Тесст',
	// 	responsible_user_id: 704742
	// }).then(cb).catch(cb);
});