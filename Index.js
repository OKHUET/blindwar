console.log('loading...');
var TelegramBot = require('node-telegram-bot-api');
console.log('loading...10%');
var fs = require('fs');
console.log('loading...20%');
var token = '377888102:AAHsFyUhfmAJEvXlifxsjP-NrvgnOxLSsns';
console.log('loading...30%');
var bot = new TelegramBot(token, {polling: true});
console.log('loading...40%');
var jf = require('jsonfile');
console.log('loading...50%');
var registration_module = require('./My_modules/Registration.js');
console.log('loading...60%');
var workshop_module = require('./My_modules/Workshop.js');
console.log('loading...70%');
var search_module = require('./My_modules/Search.js');
console.log('loading...80%');
var fight_module = require('./My_modules/Fight.js');
console.log('loading...90%');
var users = jf.readFileSync('./Databases/Users.json').users;
console.log('loading...99%');
var my_funcs = require('./My_modules/My_funcs.js');
console.log('loading...100%');
console.log('loaded');


bot.on('message', function (msg) {
	var registrationData = registration_module.registration(msg, bot, users);
	if(registrationData != null)
	{
		users = registrationData["users"];
		var userN = registrationData["userN"];
		users[userN] = workshop_module.workshop(msg.text, users[userN], bot);
		var user = search_module.searchF(msg.text, users[userN], bot);
		if(user.state == 'fight')
		{
			var searchData = my_funcs.IdBinSearch(users, {id:user.enemy}, users.length-1, 0);
			var userF = searchData['user'];
			var userFN = searchData['userN'];
			if(userF.state != 'fight') {
				userF.state = 'fight';
				userF.enemy = user.id;
				userF.robot.hitPoints = userF.robot.maxHitPoints;
				var effect;
				if(userF.robot.equip1 != null)
				{
					if(userF.robot.equip1.type == 'Shield')
					{
						effect.resist = userF.robot.equip1.resist;
						effect.name = 'shield';
						userF.robot.effects[userF.robot.effects.length]
					}
				}
				if(userF.robot.equip2 != null)
				{
					if(userF.robot.equip2.type == 'Shield')
					{
						effect.resist = userF.robot.equip1.resist;
						effect.name = 'shield';
						userF.robot.effects[userF.robot.effects.length]
					}
				}
				bot.sendMessage(userF.id, 'Противник найден', my_funcs.CreateFightKeyboard(userF.robot))
				users[userFN] = userF;
			}
		}
		users[userN] = user;
		var fightData = fight_module.fight(bot, msg.text, users, userN);
		if(fightData != null)
		{
			users[userN] = fightData.user;
			users[fightData.enemyN] = fightData.enemy;
		}
	}
	fs.writeFileSync('/Users/aroslavhorhordin/Desktop/BlindWar/Databases/Users.json', JSON.stringify({users}, null, 4));
});
