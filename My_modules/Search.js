var jf = require('jsonfile');
var fs = require('fs');
var my_classes = require('./My_classes.js');
var my_funcs = require('./My_funcs.js');
var menu = jf.readFileSync('Databases/Menu.json').menu;
var search = jf.readFileSync('Databases/Search.json').search;
	
function searchF(txt, user, bot)
{
	
	chatId = user.id;
	
	if(user.state == 'main_menu') {
		
		if(txt == 'В БОЙ'){
			console.log('User search enemy');
			if(user.robot.weapon1 != null || user.robot.weapon2 != null)
			{
				if(search[user.robot.level-1] != null)
				{
					user.enemy = search[user.robot.level-1].id;
					user.state = 'fight';
					bot.sendMessage(chatId, 'Противник найден', my_funcs.CreateFightKeyboard(user.robot));
					search[user.robot.level-1] = null;
					user.robot.hitPoints = user.robot.maxHitPoints;
					var effect;
					if(user.robot.equip1 != null)
					{
						if(user.robot.equip1.type == 'Shield')
						{
							effect.resist = user.robot.equip1.resist;
							effect.name = 'shield';
							user.robot.effects[user.robot.effects.length]
						}
					}
					if(user.robot.equip2 != null)
					{
						if(user.robot.equip2.type == 'Shield')
						{
							effect.resist = user.robot.equip1.resist;
							effect.name = 'shield';
							user.robot.effects[user.robot.effects.length]
						}
					}
				}
				else if(search[user.robot.level-2] != null)
				{
					user.enemy = search[user.robot.level-2].id;
					user.state = 'fight';
					bot.sendMessage(chatId, 'Противник найден', my_funcs.CreateFightKeyboard(user.robot));
					search[user.robot.level-2] = null;
					user.robot.hitPoints = user.robot.maxHitPoints;
					var effect;
					if(user.robot.equip1 != null)
					{
						if(user.robot.equip1.type == 'Shield')
						{
							effect.resist = user.robot.equip1.resist;
							effect.name = 'shield';
							user.robot.effects[user.robot.effects.length]
						}
					}
					if(user.robot.equip2 != null)
					{
						if(user.robot.equip2.type == 'Shield')
						{
							effect.resist = user.robot.equip1.resist;
							effect.name = 'shield';
							user.robot.effects[user.robot.effects.length]
						}
					}
				}
				else if(search[user.robot.level] != null)
				{
					user.enemy = search[user.robot.level].id;
					user.state = 'fight';
					bot.sendMessage(chatId, 'Противник найден', my_funcs.CreateFightKeyboard(user.robot));
					search[user.robot.level] = null;
					user.robot.hitPoints = user.robot.maxHitPoints;
					var effect;
					if(user.robot.equip1 != null)
					{
						if(user.robot.equip1.type == 'Shield')
						{
							effect.resist = user.robot.equip1.resist;
							effect.name = 'shield';
							user.robot.effects[user.robot.effects.length]
						}
					}
					if(user.robot.equip2 != null)
					{
						if(user.robot.equip2.type == 'Shield')
						{
							effect.resist = user.robot.equip1.resist;
							effect.name = 'shield';
							user.robot.effects[user.robot.effects.length]
						}
					}
				}
				else
				{
					search[user.robot.level-1] = new my_classes.SearchUser(user);
					user.state = 'search';
					bot.sendMessage(chatId, 'Идёт поиск противника', menu.back_menu);
				}
				fs.writeFileSync('./Databases/Search.json', JSON.stringify({search}, null, 4))
			}
			else
			{
				console.log('User go out');
				bot.sendMessage(chatId, 'Для того чтобы искать противника нужно иметь хотя бы одно оружие');
			}
		}
	}
	
	if(user.state == 'search') {
		if(txt == 'НАЗАД')
		{
			user.state = 'main_menu';
			search[user.robot.level-1] = null;
			console.log('User go out');
			bot.sendMessage(chatId, 'Поиск отменён', menu.main_menu);
			fs.writeFileSync('./Databases/Search.json', JSON.stringify({search}, null, 4))
		}
	}
	
	return user;
}

exports.searchF = searchF;

