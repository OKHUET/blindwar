//подключаем нужные модули
var fs = require('fs');
var jf = require('jsonfile');
var my_funcs = require('./My_funcs.js');
var my_classes = require('./My_classes.js');
var menu = jf.readFileSync('Databases/Menu.json').menu;
var balance = jf.readFileSync('Databases/Balance.json');



function registration(msg, bot, users)
{
	
	//проверяем что сообщение получено из приватного чата
	if(msg.chat.type === 'private')
	{
		var result = [];
		var chatId = msg.chat.id; //куда будем отсылать ответы
		var searchData = my_funcs.IdBinSearch(users, msg.from, users.length-1, 0); // ищем пользовател¤ среди зарегестрированых
		var txt = msg.text; //текст сообщени¤
		//данные которые вернет модуль
		
		//регистраци¤ пользователя
		if(searchData === null)
		{
			if (txt === '/registration') {
				//создаЄм нового пользовател¤
				var user = new my_classes.User(msg.from);
				user.robot.maxHitPoints = balance.level_hp[0];
				//вставл¤ем пользовател¤ в массив
				var insertData = my_funcs.InsertById(users, user);
				users = insertData['users'];
				result['userN'] = insertData['userN'];
				result['users'] = insertData['users'];
				
				//выводим клавиатуру главного меню
				bot.sendMessage(chatId, 'Вы зарегистрированы', menu.main_menu);
			}
		}
		else
		{
			result['userN'] = searchData['userN'];
			result['users'] = users;
			if (txt === '/registration') {
				bot.sendMessage(chatId, 'Вы уже зарегистрированы', menu.main_menu);
			}
		}
		
		//если пользователь не зарегистрирован возвращаем null
		if(result['users'] === undefined)
		{
			bot.sendMessage(chatId, 'Зарегистрируйтесь с помощью команды /registration')
			return null; //прерывание функции
		}
		else
		{
				return result;
		}
	}
}

exports.registration = registration;