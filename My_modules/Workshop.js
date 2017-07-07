
var jf = require('jsonfile');
var my_funcs = require('./My_funcs.js');
var menu = jf.readFileSync('Databases/Menu.json').menu;
var weapons = jf.readFileSync('Databases/Items.json').weapons;
var const_shields = jf.readFileSync('Databases/Items.json').const_shields;
var shields = jf.readFileSync('Databases/Items.json').shields;
var heals = jf.readFileSync('Databases/Items.json').heals;
var catch_heals = jf.readFileSync('Databases/Items.json').catch_heals;
	
	
function workshop(txt, user, bot)
{
	var chatId = user.chatId;
	
	//переход в магазин
	if(user.state === 'main_menu'){
		if(txt=='МАГАЗИН')
		{
			user.state = 'workshop_menu';
			bot.sendMessage(chatId, 'В магазине вы можете преобрести новые предметы или посмотреть свой инвентарь', menu.workshop_menu);
		}
		if(txt=='ХАРАКТЕРИСТИКИ')
		{
            //bot.sendMessage(chatId, ' или посмотреть свой инвентарь', menu.main_menu);
			var s;
            s = 'ХАРАКТЕРИСТИКИ РОБОТА:\n\nЗдоровье: ' + user.robot.maxHitPoints;
            s += '\nУровень: ' + user.robot.level;


			if(user.robot.weapon1 == undefined)
			{
				s += "\n\nОРУЖИЕ №1 : ПУСТО";
			} 
			else
			{
				s += '\n\nОРУЖИЕ №1:\n' + user.robot.weapon1.name + "\nУрон: " + user.robot.weapon1.damage + "\nПерезарядка: "  + user.robot.weapon1.cooldown;
			}
			if(user.robot.weapon2 == undefined)
			{
				s += '\n\nОРУЖИЕ №2 : ПУСТО';
			}
			else
			{
				s +='\n\nОРУЖИЕ №2:\n' + user.robot.weapon2.name + "\nУрон: " + user.robot.weapon2.damage + "\nПерезарядка: "  + user.robot.weapon2.cooldown, menu.choose_slot_menu;
			}
			if(user.robot.equip1 == undefined)
			{
				s += '\n\nЭкиперовка №1 : ПУСТО';
			}
			else
			{
				s += "\n\nЭкиперовка №1:\n";
				if (user.robot.equip1.type == 'ConstShield') {
					s += user.robot.equip1.name + "\nЗащита: " + user.robot.equip1.resist;
				}
				if (user.robot.equip1.type == 'Shield') {
					s += user.robot.equip1.name + "\nЗащита: " + user.robot.equip1.resist + "\nКоличество отраженных атак: " + user.robot.equip1.attakN + "\nПерезарадка: " + user.robot.equip1.cooldown;
				}
				if (user.robot.equip1.type == 'Heal') {
					s += user.robot.equip1.name + "\nЛечение: " + user.robot.equip1.heal + "\nДополнительный урон: " + user.robot.equip1.additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + user.robot.equip1.attackN + + "\nПерезарядка: " + user.robot.equip1.cooldown;
				}
				if (user.robot.equip1.type == 'CatchHeal') {
					s += user.robot.equip1.name + "\nЛечение: " + user.robot.equip1.heal + "\nВремя лечения: " + user.robot.equip1.healTime+ + "\nПерезарядка: " + user.robot.equip1.cooldown;
				}
			}
			if(user.robot.equip2 == undefined)
			{
				s += '\n\nЭкиперовка №2 : ПУСТО';
			}
			else
			{
				s += "\n\nЭкиперовка №2:\n";
				if (user.robot.equip2.type == 'ConstShield') {
					s += user.robot.equip2.name + "\nЗащита: " + user.robot.equip2.resist;
				}
				if (user.robot.equip2.type == 'Shield') {
					s += user.robot.equip2.name + "\nЗащита: " + user.robot.equip2.resist + "\nКоличество отраженных атак: " + user.robot.equip2.attakN + "\nПерезарадка: " + user.robot.equip2.cooldown;
				}
				if (user.robot.equip2.type == 'Heal') {
					s += user.robot.equip2.name + "\nЛечение: " + user.robot.equip2.heal + "\nДополнительный урон: " + user.robot.equip2.additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + user.robot.equip2.attackN + + "\nПерезарядка: " + user.robot.equip2.cooldown;
				}
				if (user.robot.equip2.type == 'CatchHeal') {
					s += user.robot.equip2.name + "\nЛечение: " + user.robot.equip2.heal + "\nВремя лечения: " + user.robot.equip2.healTime+ + "\nПерезарядка: " + user.robot.equip2.cooldown;
				}

			}
        	bot.sendMessage(chatId, s, menu.main_menu);
		}
	}
	
	//меню магазина
	if(user.state === 'workshop_menu'){
		if(txt === 'КУПИТЬ ПРЕДМЕТЫ')
		{
			user.state = 'shop_menu';
			bot.sendMessage(chatId, 'У вас ' + user.money + ' кредитов\nКакие предметы вы хотите приобрести?', menu.shop_menu); 
		} 
		else if(txt === 'ПОСМОТРЕТЬ ИНВЕНТАРЬ')
		{
			user.state = 'pre_bag';
			bot.sendMessage(chatId, '.', menu.pre_bag_menu); 
			return user;
		}
		else if(txt === 'НАЗАД')
		{
			user.state = 'main_menu';
			bot.sendMessage(chatId, '.', menu.main_menu);
		}
	}
	
	//меню покупок
	if(user.state === 'shop_menu'){
		if(txt == 'НАЗАД')
		{
			user.state = 'workshop_menu'
			bot.sendMessage(chatId, 'В магазине вы можете преобрести новые предметы или посмотреть свой инвентарь', menu.workshop_menu);
			return user;
		}
		if (txt === 'КУПИТЬ ОРУЖИЕ') {
			user.state = 'buy_weapon';
			bot.sendMessage(chatId, 'Введите уровень оружия, которое желаете приобрести', menu.back_menu); 
			return user;
		}
		else if (txt === 'КУПИТЬ ЭКИПЕРОВКУ') {			
			user.state = 'buy_equipment';
			bot.sendMessage(chatId, 'Какой тип экиперовки вы хотите приобрести?', menu.buy_equipment_menu);
			return user;
		}
	}
	
	//вывод оружия
	if (user.state === 'buy_weapon') {
		if(txt == 'НАЗАД')
		{
			user.state = 'shop_menu';
			bot.sendMessage(chatId, '.', menu.shop_menu);
		}
		else
		{
			var n = txt - 0;
			if (!isNaN(n)) {
				var b = false;
				var s;
				for (var i = 0; i < weapons.length; i++) {
					if (n == weapons[i].needLevel) {
						s = weapons[i].name + "\n id: /" + weapons[i].id + "\nУрон: " + weapons[i].damage + "\nПерезарядка: "  + weapons[i].cooldown  + "\nНеобходимый уровень: " + weapons[i].needLevel + "lvl"  + "\nЦена: " + weapons[i].price ;
						bot.sendMessage(chatId, s);
						b = true;
					}
				}
				if(b){
					user.state = 'buy_weapon_id';
					bot.sendMessage(chatId, "Чтобы купить оружие, введите его id", menu.back_menu);
					return user;
				}
				else{
					bot.sendMessage(chatId, "На этот уровень нет предметов");
					return user;
				}
			}
			else {
				bot.sendMessage(chatId, "Необходимо ввести число.");
			}
		}
	}
	
	//покупка оружия
	if (user.state == 'buy_weapon_id') {
		if(txt == 'НАЗАД')
		{
			bot.sendMessage(chatId, 'Введите уровень оружия, которое желаете приобрести', menu.back_menu); 
			user.state = 'buy_weapon';
			return user;
		}
		else{
			if(txt[0] == '/')
			{
				txt = txt.slice(1)
				var t = txt - 0;
				if (!isNaN(t)) {
					var b = true;
					var weapon = null;
					for (var i = 0; i < weapons.length; i++) {
						if (weapons[i].id == t) {
							weapon = weapons[i];
						}
					}
					if(weapon != null)
					{
						b = false;
						//проверка на наличие подобного оружия в инвентаре
						var f=0;
						for (var i = 0; i < user.inventory.length; i++) {
							if (user.inventory[i].id == weapon.id && user.inventory[i].type == weapon.type) {f=1}
						}
			
						if ((user.money >= weapon.price) && (user.robot.level >= weapon.needLevel) && (f == 0)){		
							var insertData = my_funcs.InsertById(user.inventory, weapon);
							user.inventory = insertData['users'];
							user.money = user.money - weapon.price; 
							user.state = 'workshop_menu';
							bot.sendMessage(chatId, 'Покупка совершена', menu.workshop_menu);
						}
						else
						{
							if(user.money < weapon.price) {bot.sendMessage(chatId, "У Вас недостаточно кредитов");}
							if(user.robot.level < weapon.needLevel) {bot.sendMessage(chatId, "У Вас недостаточный уровень");}
							if(f == 1) {bot.sendMessage(chatId, "У Вас уже есть этот предмет");}
						}
					}
					if(b) {
						bot.sendMessage(chatId, 'Такого оружия нет')
					}
				}
				else
				{
					bot.sendMessage(chatId, "Необходимо ввести id оружия.", menu.back_menu);
				}
			}else{
				bot.sendMessage(chatId, "Необходимо ввести id оружия.", menu.back_menu);
			}
		}
	}
	
	//выбор экиперовки
	if (user.state == 'buy_equipment') {
		if(txt == 'ЩИТ')
		{
			user.state = 'buy_shield';
			bot.sendMessage(chatId, 'Какой тип щитов вы хотите приобрести?', menu.buy_shield_menu);
		}
		else if(txt == 'ЛЕЧЕНИЕ')
		{
			user.state = 'buy_heal';
			bot.sendMessage(chatId, 'Какой тип лечащих предметов вы хотите приобрести?', menu.buy_heal_menu);
		}
		else if(txt == 'НАЗАД')
		{
			user.state = 'shop_menu';
			bot.sendMessage(chatId, 'Какие предметы вы хотите приобрести', menu.shop_menu); 
		}
	}
	
	//выбор щитов
	if (user.state == 'buy_shield'){
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_equipment';
			bot.sendMessage(chatId, 'Какой тип экиперовки вы хотите приобрести?', menu.buy_equipment_menu);
		}
		else if(txt == 'ПАССИВНЫЙ')
		{
			user.state = 'buy_const_shield';
			bot.sendMessage(chatId, 'Введите уровень щита', menu.back_menu);
			return user;
		} 
		else if(txt == 'АКТИВНЫЙ')
		{
			user.state = 'buy_ordinary_shield';
			bot.sendMessage(chatId, 'Введите уровень щита', menu.back_menu);
			return user;
		}
		else if(txt == "ПОМОЩЬ")
		{
			bot.sendMessage(chatId, 'Пассивные щиты - действуют на протяжении всего боя и блокируют определённую часть наносимого урона\n\nАктивные щиты - при использовании блокируют некоторую чать урона от нескольких следующих атак');
		}
	}
	
	//вывод пассивных щитов
	if (user.state == 'buy_const_shield') {
		if(txt == 'НАЗАД')
		{
			bot.sendMessage(chatId, 'Какой тип щитов вы хотите приобрести?', menu.buy_shield_menu);
			user.state = 'buy_shield';
			return user;
		}
		else
		{
			var n = txt - 0;
			if ( !isNaN(n)) {
				var b = false;
				var s;
				for (var i = 0; i < const_shields.length; i++) {
					if (n == const_shields[i].needLevel) {
						s = const_shields[i].name + "\nid: /" + const_shields[i].id + "\nЗащита: " + const_shields[i].resist + "\nНеобходимый уровень: " + const_shields[i].needLevel + "lvl"  + "\nЦена: " + const_shields[i].price ;
						b = true;
						bot.sendMessage(chatId, s);
					}
				}
				if(b){
					user.state = 'buy_const_shield_id';
					bot.sendMessage(chatId, "Чтобы купить щит, введите его id", menu.back_menu);
					return user;
				} else {
					bot.sendMessage(chatId, "На этот уровень нет предметов");
				}
			}
			else 
				{
				bot.sendMessage(chatId, "Необходимо ввести число");
			}
		}
	}
	
	//покупка пассивного щита
	if (user.state == 'buy_const_shield_id') {
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_const_shield';
			bot.sendMessage(chatId, 'Введите уровень щита', menu.back_menu);
			return user;
		}
		else
		{
			if(txt[0] == '/')
			{
				txt = txt.slice(1);
				var t = txt - 0;
				if ( !isNaN(t)) {
					var const_shield = null;
					for (var i = 0; i < const_shields.length; i++) {
						if (const_shields[i].id == t) {
							const_shield = const_shields[i];
						}
					}
					
					if(const_shield!=null)
					{
						b = false;
						var f=0;
						for (var i = 0; i < user.inventory.length; i++) {
							if (user.inventory[i].id == const_shield.id && user.inventory[i].type == const_shield.type) {f=1}
						}

						if ((user.money >= const_shield.price) && (user.robot.level >= const_shield.needLevel) && (f == 0))
						{		
							var insertData = my_funcs.InsertById(user.inventory, const_shield);
							user.inventory = insertData['users'];
							user.money = user.money - const_shield.price;
							user.state = 'workshop_menu';
							bot.sendMessage(chatId, 'Покупка совершена', menu.workshop_menu);
						}
						else{
							if(user.money < const_shield.price) {bot.sendMessage(chatId, "У Вас недостаточно кредитов");}
							if(user.robot.level < const_shield.needLevel) {bot.sendMessage(chatId, "У Вас недостаточный уровень");}
							if(f == 1) {bot.sendMessage(chatId, "У Вас уже есть этот щит");}
						}
					}
				}
				else {
					bot.sendMessage(chatId, "Необходимо ввести id");
				}
			} else {
				bot.sendMessage(chatId, "Необходимо ввести id");
			}
		}
	}

	//вывод активных щитов
	if (user.state == 'buy_ordinary_shield') {
		if(txt == 'НАЗАД')
		{
			bot.sendMessage(chatId, 'Какой тип щитов вы хотите приобрести?', menu.buy_shield_menu);
			user.state = 'buy_shield';
		}
		else
		{
			var n = txt - 0;
			if ( !isNaN(n)) {
				var b = false;
				var s;
				for (var i = 0; i < shields.length; i++) {
					if (n == shields[i].needLevel) {
						s = shields[i].name + "id: " + shields[i].id + "\nЗащита: " + shields[i].resist + "\nКоличество отраженных атак: " + shields[i].attakN + "\nПерезарадка: " + shields[i].cooldown + "\nНеобходимый уровень: " + shields[i].needLevel + "lvl"  + "\nЦена: " + shields[i].price ;
						bot.sendMessage(chatId, s);
						b = true;
					}
				}
				if(b) {
					user.state = 'buy_ordinary_shield_id';
					bot.sendMessage(chatId, "Чтобы купить щит, введите его id", menu.back_menu);
					return user;
				} else {
					bot.sendMessage(chatId, "На этот уровень нет предметов");
				}
			}
			else 
				{
				bot.sendMessage(chatId, "Необходимо ввести число");
			}	
		}
	}
	
	//покупка активного щита
	if (user.state == 'buy_ordinary_shield_id') {
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_const_shield';
			bot.sendMessage(chatId, 'Введите уровень щита', menu.back_menu);
			return user;
		}
		else{
			if(txt[0] == '/')
			{
				txt = txt.slice(1);
				var t = txt - 0;
				var shield = null;
				if ( !isNaN(t)) {
					for (var i = 0; i < shields.length; i++) {
						if (shields[i].id == t) {
							var shield = shields[i];
						}
					}
					if(shield != null) {
						var f=0;
						for (var i = 0; i < user.inventory.length; i++) {
							if (user.inventory[i].id == shield.id && user.inventory[i].type == shield.type) {f=1}
						}
					
						if ((user.money >= shield.price) && (user.robot.level >= shield.needLevel) && (f == 0)){		
							var insertData = my_funcs.InsertById(user.inventory, shield);
							ser.inventory = insertData['users'];
							user.money = user.money - shield.price;
							user.state = 'workshop_menu';
							bot.sendMessage(chatId, 'Покупка совершена', menu.workshop_menu);
						}
						else {
							if(user.money < shield.price) {bot.sendMessage(chatId, "У Вас недостаточно кредитов");}
							if(user.robot.level < shield.needLevel) {bot.sendMessage(chatId, "У Вас недостаточный уровень");}
							if(f == 1) {bot.sendMessage(chatId, "У Вас уже есть этот щит");}
						}
					}
				}
				else {
					bot.sendMessage(chatId, "Необходимо ввести id");
				}
			} else {
				bot.sendMessage(chatId, "Необходимо ввести id");
			}
		}
	}

	//выбор лечения
	if (user.state == 'buy_heal') {
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_equipment';
			bot.sendMessage(chatId, 'Какой тип экиперовки вы хотите приобрести?', menu.buy_equipment_menu);
		}
		else if(txt === 'ЭНЕРГОСТИМУЛЯТОРЫ')
		{
			user.state = 'buy_heal_1';
			bot.sendMessage(chatId, 'Введите уровень энергостимулятора', menu.back_menu);
			return user;
		}
		else if(txt == 'ЭНЕРГООБСОРБЕНТЫ')
		{
			user.state = 'buy_heal_2';
			bot.sendMessage(chatId, 'Введите уровень энергообсорбента', menu.back_menu);
			return user;
		}
		else if(txt == 'ПОМОЩЬ')
		{
			bot.sendMessage(chatId, 'Энергостимуляторы - исцеляет робота, но следующие несколько атак он будет получать больше урона\n\nЭнергоабсорбенты - сводят на нет следующую атаку и исцеляит робота');
		}
	}
	
	//вывод энергостимуляторов
	if (user.state == 'buy_heal_1') {
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_heal';
			bot.sendMessage(chatId, 'Какой тип лечащих предметов вы хотите приобрести?', menu.buy_heal_menu);
		}
		else
		{
			var n = txt - 0;
			if ( !isNaN(n)) {
				var s;
				var b = false;
				for (var i = 0; i < heals.length; i++) {
					s = heals[i].name + "\nid: " + heals[i].id + "\nЛечение: " + heals[i].heal + "\nДополнительный урон: " + heals[i].additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + heals[i].attackN + + "\nПерезарядка: " + heals[i].cooldown + "\nНеобходимый уровень: " + heals[i].needLevel + "lvl"  + "\nЦена: " + heals[i].price ;
					if (n == heals[i].needLevel) {
						s = heals[i].name + "\nid: " + heals[i].id + "\nЛечение: " + heals[i].heal + "\nДополнительный урон: " + heals[i].additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + heals[i].attackN + + "\nПерезарядка: " + heals[i].cooldown + "\nНеобходимый уровень: " + heals[i].needLevel + "lvl"  + "\nЦена: " + heals[i].price ;
						bot.sendMessage(chatId, s);
						b = true;
					}
				}
				if(b) {
					user.state = 'buy_heal_1_id';
					bot.sendMessage(chatId, "Чтобы купить предмет, введите его id", menu.back_menu);
					return user;
				} else {
					bot.sendMessage(chatId, "На этот уровень нет предметов");
				}
			}
			else 
				{
				bot.sendMessage(chatId, "Необходимо ввести число");
			}
		}
	}	
	
	//покупка энергостемуляторов
	if (user.state == 'buy_heal_1_id') {	
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_heal_1';
			bot.sendMessage(chatId, 'Введите уровень энергостимулятора', menu.back_menu);
			return user;
		}
		else
		{
			if(txt[0] == '/') {
				txt = txt.slice(1);
				var t = txt - 0;
				var heal;
				if ( !isNaN(t)) {
					for (var i = 0; i < heals.length; i++) {
						if (heals[i].id == t) {
							heal = heals[i];
						}
					}
					
					if(heal != null) {
						var f=0;
						for (var i = 0; i < user.inventory.length; i++) {
							if (user.inventory[i].id == heal.id && user.inventory[i].type == heal.type) {f=1}
						}

						if ((user.money >= heal.price) && (user.robot.level >= heal.needLevel) && (f == 0)){		
							var insertData = my_funcs.InsertById(user.inventory, heal);
							user.inventory = insertData['users'];
							user.money = user.money - heal.price;
							user.state = 'workshop';
							bot.sendMessage(chatId, 'Покупка совершена', menu.workshop_menu);
						}
						else{
							if(user.money < heal.price) {bot.sendMessage(chatId, "У Вас недостаточно кредитов");}
							if(user.robot.level < heal.needLevel) {bot.sendMessage(chatId, "У Вас недостаточный уровень");}
							if(f == 1) {bot.sendMessage(chatId, "У Вас уже есть этот предмет");}
						}
					}
				}
				else {
					bot.sendMessage(chatId, "Необходимо ввести id");
				}
			} else {
				bot.sendMessage(chatId, "Необходимо ввести id");
			}
		}
	}
	
	//вывод энергообсорбентов
	if (user.state == 'buy_heal_2') {
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_heal';
			bot.sendMessage(chatId, 'Какой тип лечащих предметов вы хотите приобрести?', menu.buy_heal_menu);
			return user;
		}
		else{
			var n = txt - 0;
			if ( !isNaN(n)) {
				var b = false;
				var s;
				for (var i = 0; i < catch_heals.length; i++) {
					if (n == catch_heals[i].needLevel) {
						s = catch_heals[i].name + "\nid: /" + catch_heals[i].id + "\nЛечение: " + catch_heals[i].heal + "\nВремя лечения: " + catch_heals[i].healTime+ + "\nПерезарядка: " + catch_heals[i].cooldown + "\nНеобходимый уровень: " + catch_heals[i].needLevel + "lvl"  + "\nЦена: " + catch_heals[i].price ;
						bot.sendMessage(chatId, s);
						b = true;
					}
				}
				if(b) {
					user.state = 'buy_heal_2_id';
					bot.sendMessage(chatId, "Чтобы купить предмет, введите его id", menu.back_menu);
					return user;
				} else {
					bot.sendMessage(chatId, "На этот уровень нет предметов");
				}
			}
			else 
			{
				bot.sendMessage(chatId, "Необходимо ввести число");
			}
		}
	}	
	
	//покупка энергообсорбентов
	if (user.state == 'buy_heal_2_id') {
		if(txt == 'НАЗАД')
		{
			user.state = 'buy_heal_2';
			bot.sendMessage(chatId, 'Введите уровень энергообсорбента', menu.back_menu);
			return user;
		}
		else
		{
			if(txt[0] = '/') {
				txt = txt.slice(1);
				var t = txt - 0;
				var catch_heal = null;
				if ( !isNaN(t)) {
					for (var i = 0; i < catch_heals.length; i++) {
						if (catch_heals[i].id == t) {
							catch_heal = catch_heals[i];
						}
					}
					if(catch_heal != null) {
						var f=0;
						for (var i = 0; i < user.inventory.length; i++) {
							if (user.inventory[i].id == catch_heal.id && user.inventory[i].type == catch_heal.type) {f=1}
						}
						if ((user.money >= catch_heal.price) && (user.robot.level >= catch_heal.needLevel) && (f == 0)){		
							var insertData = my_funcs.InsertById(user.inventory, catch_heal);
							user.inventory = insertData['users'];
							user.money = user.money - catch_heal.price;
							user.state = 'workshop_menu';
							bot.sendMessage(chatId, 'Покупка совершена', menu.workshop_menu);
						}
						else{
							if(user.money < catch_heal.price) {bot.sendMessage(chatId, "У Вас недостаточно кредитов");}
							if(user.robot.level < catch_heal.needLevel) {bot.sendMessage(chatId, "У Вас недостаточный уровень");}
							if(f == 1) {bot.sendMessage(chatId, "У Вас уже есть это лечение");}
						}
					}
				}
				else {
					bot.sendMessage(chatId, "Необходимо ввести id");
				}
			} else {
				bot.sendMessage(chatId, "Необходимо ввести id");
			}
		}
	}

	//выбор что посмотреть
	if(user.state == 'pre_bag'){
		if(txt == 'НАЗАД')
		{
			user.state = 'workshop_menu';
			bot.sendMessage(chatId, '.', menu.workshop_menu);
		}
		else if (txt == 'СУМКА')
		{
			user.state = 'bag';
			bot.sendMessage(chatId, 'введите уровень предметов, которые хотите посмотреть', menu.back_menu); 
			return user;
		}
		else if(txt == 'НАДЕТЫЕ ПРЕДМЕТЫ')
		{
			var s
			if(user.robot.weapon1 == undefined)
			{
				s = "ОРУЖИЕ №1: ПУСТО";
			}
			else
			{
				s = "ОРУЖИЕ №1: " + user.robot.weapon1.name + "\nУрон: " + user.robot.weapon1.damage + "\nПерезарядка:" + user.robot.weapon1.cooldown;
			}
			if(user.robot.weapon2 == undefined)
			{
				s += "\n\nОРУЖИЕ №2: ПУСТО";
			}
			else
			{
				s += "\n\nОРУЖИЕ №2: " + user.robot.weapon2.name + "\nУрон: " + user.robot.weapon2.damage + "\nПерезарядка:" + user.robot.weapon2.cooldown;
			}
			s += "\n\nЭкиперовка №1: ";
			if(user.robot.equip1 == undefined)
			{
				s += 'ПУСТО';
			}
			else
			{
				if (user.robot.equip1.type == 'ConstShield') {
					s += user.robot.equip1.name + "\nЗащита: " + user.robot.equip1.resist;
				}
				if (user.robot.equip1.type == 'Shield') {
					s += user.robot.equip1.name  + "\nЗащита: " + user.robot.equip1.resist + "\nКоличество отраженных атак: " + user.robot.equip1.attakN + "\nПерезарадка: " + user.robot.equip1.cooldown;
				}
				if (user.robot.equip1.type == 'Heal') {
					s += user.robot.equip1.name + "\nЛечение: " + user.robot.equip1.heal + "\nДополнительный урон: " + user.robot.equip1.additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + user.robot.equip1.attackN + + "\nПерезарядка: " + user.robot.equip1.cooldown;
				}
				if (user.robot.equip1.type == 'CatchHeal') {
					s += user.robot.equip1.name + "\nЛечение: " + user.robot.equip1.heal + "\nВремя лечения: " + user.robot.equip1.healTime+ + "\nПерезарядка: " + user.robot.equip1.cooldown;
				}
			}
			s += "\n\nЭкиперовка №2: ";
			if(user.robot.equip2 == undefined)
			{
				s += 'ПУСТО';
			}
			else
			{
				if (user.robot.equip2.type == 'ConstShield') {
					s += user.robot.equip2.name + "\nЗащита: " + user.robot.equip2.resist;
				}
				if (user.robot.equip2.type == 'Shield') {
					s += user.robot.equip2.name  + "\nЗащита: " + user.robot.equip2.resist + "\nКоличество отраженных атак: " + user.robot.equip2.attakN + "\nПерезарадка: " + user.robot.equip2.cooldown;
				}
				if (user.robot.equip2.type == 'Heal') {
					s += user.robot.equip2.name + "\nЛечение: " + user.robot.equip2.heal + "\nДополнительный урон: " + user.robot.equip2.additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + user.robot.equip2.attackN + + "\nПерезарядка: " + user.robot.equip2.cooldown;
				}
				if (user.robot.equip2.type == 'CatchHeal') {
					s += user.robot.equip2.name + "\nЛечение: " + user.robot.equip2.heal + "\nВремя лечения: " + user.robot.equip2.healTime+ + "\nПерезарядка: " + user.robot.equip2.cooldown;
				}
			}
			bot.sendMessage(chatId, s);
		}
	}
	
	//вывод предметов
	if (user.state == 'bag') {
		if(txt == 'НАЗАД')
		{
			user.state = 'pre_bag';
			bot.sendMessage(chatId, '.', menu.pre_bag_menu); 
			return user; 
		}
		else {
			var n = txt - 0;
			if (!isNaN(n)) {
				var s = null;
				for (var i = 0; i < user.inventory.length; i++) {
					if (n == user.inventory[i].needLevel) {
						if (user.inventory[i].type == 'Weapon') {
							s = user.inventory[i].name + "\nid: /" + user.inventory[i].id + "\nУрон: " + user.inventory[i].damage + "\nПерезарядка: "  + user.inventory[i].cooldown;
						}
						if (user.inventory[i].type == 'ConstShield') {
							s = user.inventory[i].name + "\nid: /" + user.inventory[i].id + "\nЗащита: " + user.inventory[i].resist;
						}
						if (user.inventory[i].type == 'Shield') {
							s = user.inventory[i].name + "\nid: /" + user.inventory[i].id + "\nЗащита: " + user.inventory[i].resist + "\nКоличество отраженных атак: " + user.inventory[i].attakN + "\nПерезарадка: " + user.inventory[i].cooldown;
						}
						if (user.inventory[i].type == 'Heal') {
							s = user.inventory[i].name + "\nid: /" + user.inventory[i].id + "\nЛечение: " + user.inventory[i].heal + "\nДополнительный урон: " + user.inventory[i].additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + user.inventory[i].attackN + + "\nПерезарядка: " + user.inventory[i].cooldown;
						}
						if (user.inventory[i].type == 'CatchHeal') {
							s = user.inventory[i].name + "\nid: /" + user.inventory[i].id + "\nЛечение: " + user.inventory[i].heal + "\nВремя лечения: " + user.inventory[i].healTime+ + "\nПерезарядка: " + user.inventory[i].cooldown;
						}
						bot.sendMessage(chatId, s);
					}
				}
				if(s==null)
				{
					bot.sendMessage(chatId, "У вас нет предметов этого уровня", menu.back_menu);
				}
				{
					bot.sendMessage(chatId, "Чтобы надеть предмет введите его id", menu.back_menu);
					user.state = "bag_id";
					return user;
				}
			}
			else {
				bot.sendMessage(chatId, "Необходимо ввести число.");
			}
		}
	}	
	
	//выбор предмета
	if (user.state == 'bag_id') {
		if(txt == 'НАЗАД')
		{
			user.state = 'bag';
			bot.sendMessage(chatId, 'Введите уровень предметов, которые хотите посмотреть', menu.back_menu);
			return user;
		}
		else
		{
			if(txt[0] = '/') {
				txt = txt.slice(1);
				var t = txt - 0;
				var itemN = null;
				if ( !isNaN(t)) {
					for (var i = 0; i < user.inventory.length; i++) {
						if (user.inventory[i].id == t) {
							itemN = i;
						} else {
							itemN = null;
						}
						if(itemN != null) {
							if(user.inventory[i].type == 'Weapon')
							{
								if(user.robot.weapon1 != null)
								{
									if(user.robot.weapon1.id == t)
									{
										bot.sendMessage(chatId, "Этот предмет уже надет на вас");
										return user;
									}
								}
								if(user.robot.weapon2 != null)
								{
									if(user.robot.weapon2.id == t)
									{
										bot.sendMessage(chatId, "Этот предмет уже надет на вас");
										return user;
									}
								}
								user.state = 'swap_weapon'
								if(user.robot.weapon1 == undefined)
								{
									bot.sendMessage(chatId, "СЛОТ1 : ПУСТО")
								} 
								else
								{
									bot.sendMessage(chatId, 'СЛОТ1:\n' + user.robot.weapon1.name + "\nУрон: " + user.robot.weapon1.damage + "\nПерезарядка: "  + user.robot.weapon1.cooldown);
								}
								if(user.robot.weapon2 == undefined)
								{
									bot.sendMessage(chatId, 'СЛОТ2 : ПУСТО')
								}
								else
								{
									bot.sendMessage(chatId, 'СЛОТ2:\n' + user.robot.weapon2.name + "\nУрон: " + user.robot.weapon2.damage + "\nПерезарядка: "  + user.robot.weapon2.cooldown, menu.choose_slot_menu);
								}
							}
							else
							{
								if(user.robot.equip1 != null)
								{
									if(user.robot.equip1.id == t)
									{
										bot.sendMessage(chatId, "Этот предмет уже надет на вас");
										return user;
									}
								}
								if(user.robot.equip2 != null)
								{
									if(user.robot.equip2.id == t)
									{
										bot.sendMessage(chatId, "Этот предмет уже надет на вас");
										return user;
									}
								}
								var s;
								if(user.robot.equip1 == undefined)
								{
									bot.sendMessage(chatId, 'СЛОТ1 : ПУСТО');
								}
								else
								{
									s = "СЛОТ1:\n";
									if (user.robot.equip1.type == 'ConstShield') {
										s += user.robot.equip1.name + "\nЗащита: " + user.robot.equip1.resist;
									}
									if (user.robot.equip1.type == 'Shield') {
										s += user.robot.equip1.name + "\nЗащита: " + user.robot.equip1.resist + "\nКоличество отраженных атак: " + user.robot.equip1.attakN + "\nПерезарадка: " + user.robot.equip1.cooldown;
									}
									if (user.robot.equip1.type == 'Heal') {
										s += user.robot.equip1.name + "\nЛечение: " + user.robot.equip1.heal + "\nДополнительный урон: " + user.robot.equip1.additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + user.robot.equip1.attackN + + "\nПерезарядка: " + user.robot.equip1.cooldown;
									}
									if (user.robot.equip1.type == 'CatchHeal') {
										s += user.robot.equip1.name + "\nЛечение: " + user.robot.equip1.heal + "\nВремя лечения: " + user.robot.equip1.healTime+ + "\nПерезарядка: " + user.robot.equip1.cooldown;
									}
									bot.sendMessage(chatId, s);
								}
								if(user.robot.equip2 == undefined)
								{
									bot.sendMessage(chatId, 'СЛОТ2 : ПУСТО');
								}
								else
								{
									s = "СЛОТ2:\n";
									if (user.robot.equip2.type == 'ConstShield') {
										s += user.robot.equip2.name + "\nЗащита: " + user.robot.equip2.resist;
									}
									if (user.robot.equip2.type == 'Shield') {
										s += user.robot.equip2.name + "\nЗащита: " + user.robot.equip2.resist + "\nКоличество отраженных атак: " + user.robot.equip2.attakN + "\nПерезарадка: " + user.robot.equip2.cooldown;
									}
									if (user.robot.equip2.type == 'Heal') {
										s += user.robot.equip2.name + "\nЛечение: " + user.robot.equip2.heal + "\nДополнительный урон: " + user.robot.equip2.additionalDamage +"%" + "\nКоличество атак, которые будут усилены: " + user.robot.equip2.attackN + + "\nПерезарядка: " + user.robot.equip2.cooldown;
									}
									if (user.robot.equip2.type == 'CatchHeal') {
										s += user.robot.equip2.name + "\nЛечение: " + user.robot.equip2.heal + "\nВремя лечения: " + user.robot.equip2.healTime+ + "\nПерезарядка: " + user.robot.equip2.cooldown;
									}
									bot.sendMessage(chatId, s);
								}
								user.state = 'swap_equipment'
							}
							bot.sendMessage(chatId, 'Выберите слот,который хотите заменить', menu.choose_slot_menu);
							user.swapItemN = i;
							return user;
						}
					}
				}
				else {
					bot.sendMessage(chatId, "Необходимо ввести id");
				}
			} else {
				bot.sendMessage(chatId, "Необходимо ввести id");
			}
		}
	}
	
	//выбор слота оружия
	if (user.state == 'swap_weapon'){
		if(txt == 'НАЗАД')
		{
			user.state = 'bag_id';
			bot.sendMessage(chatId, 'Введите id предмета, который хотите надеть', menu.back_menu);
			return user;
		}
		else if(txt == "СЛОТ1")
		{
			user.robot.weapon1 = user.inventory[user.swapItemN];
			user.state = 'pre_bag';
			bot.sendMessage(chatId, 'Предмет надет', menu.pre_bag_menu);
		}
		else if(txt == 'СЛОТ2')
		{
			user.robot.weapon2 = user.inventory[user.swapItemN];
			user.state = 'pre_bag';
			bot.sendMessage(chatId, 'Предмет надет', menu.pre_bag_menu);
		}
	}
	
	//выбор слота экиперовки
	if (user.state == 'swap_equipment') {
		if(txt == 'НАЗАД')
		{
			user.state = 'bag_id';
			bot.sendMessage(chatId, 'Введите id предмета, который хотите надеть', menu.back_menu);
			return user;
		}
		else if(txt == "СЛОТ1")
		{
			user.robot.equip1 = user.inventory[user.swapItemN];
			user.state = 'pre_bag';
			bot.sendMessage(chatId, 'Предмет надет', menu.pre_bag_menu);
		}
		else if(txt == 'СЛОТ2')
		{
			user.robot.equip2 = user.inventory[user.swapItemN];
			user.state = 'pre_bag';
			bot.sendMessage(chatId, 'Предмет надет', menu.pre_bag_menu);
		}
	}

	return user;
}
		
exports.workshop = workshop;

