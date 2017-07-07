var jf = require('jsonfile');
var fs = require('fs');
var menu = jf.readFileSync('Databases/Menu.json').menu;
var balance = jf.readFileSync('Databases/Balance.json');
var my_funcs = require('./My_funcs.js');

function fight(bot, txt, users, userN)
{
	if(users[userN].state == 'fight') {
		var user = users[userN];
		var searchData = my_funcs.IdBinSearch(users, {id:user.enemy}, users.length-1, 0);
		var enemy = searchData['user'];
		var enemyN = searchData['userN'];
		var time = Date.now();
		if(user.robot.weapon1 != null)
		{
			if(txt.indexOf(user.robot.weapon1.name) != -1)
			{
				console.log(time - user.robot.weaponCooldown1);
				if(time - user.robot.weaponCooldown1 >= user.robot.weapon1.cooldown * 1000){
					user.robot.weaponCooldown1 = time;
					var calcDam = calculateDamage(enemy.robot.effects, user.robot.weapon1.damage);
					enemy.robot.effects = calcDam.effects;
					enemy.robot.hitPoints -= calcDam.damage;
					if(calcDam<0) {
						bot.sendMessage(user.id, 'Противник поглатил атаку и восстановил себе ' + -calcDam.damage + ' урона');
						bot.sendMessage(enemy.id, 'Вы поглотили атаку противника и восстановили себе ' + -calcDam.damage + ' здоровья');
					}
				} else {
						bot.sendMessage(user.id, 'Перезарядка ' + (((user.robot.weaponCooldown1 * 1000 - user.robot.weapon1.cooldown + time)/1000) + "").slice(0,4) + ' сек.');
				}
				if(enemy.robot.hitPoints <=0) {
					win(user, enemy, bot);
				}
			}
		}
		
		if(user.robot.weapon2 != null)
		{
			if(txt.indexOf(user.robot.weapon2.name) != -1)
			{
				if(time - user.robot.weaponCooldown2 >= user.robot.weapon2.cooldown * 1000){
					user.robot.weaponCooldown2 = time;
					var calcDam = calculateDamage(enemy.robot.effects, user.robot.weapon2.damage);
					enemy.robot.effects = calcDam.effects;
					enemy.robot.hitPoints -= calcDam.damage;
					if(calcDam<0) {
						bot.sendMessage(user.id, 'Противник поглатил атаку и восстановил себе ' + -calcDam.damage + ' урона');
						bot.sendMessage(enemy.id, 'Вы поглотили атаку противника и восстановили себе ' + -calcDam.damage + ' здоровья');
					} else {
						bot.sendMessage(user.id, 'Перезарядка ' + (((user.robot.weaponCooldown2*1000 - user.robot.weapon2.cooldown + time)/1000) + "").slice(0,4) + ' сек.');
					}
					if(enemy.robot.hitPoints <=0) {
						win(user, enemy, bot);
					}
				}
			}
		}
	
		if(user.robot.equip1 != null)
		{
			if(txt.indexOf(user.robot.equip1.name) != -1)
			{
				if(time - user.robot.equipCooldown1 > user.robot.equip1.cooldown * 1000){
					user.robot.equipCooldown1 = time;
					user.robot.effects[user.robot.effects.length] = getEffect(user.robot.equip1);
				}
			}
		}
		
		if(user.robot.equip2 != null)
		{
			if(txt.indexOf(user.robot.equip2.name) != -1)
			{
				if(time - user.robot.equipCooldown2 > user.robot.equip2.cooldown * 1000){
					user.robot.equipCooldown2 = time;
					user.robot.effects[user.robot.effects.length] = getEffect(user.robot.equip2);
				}
			}
		}
		
		if(txt == "СДАТЬСЯ")
		{
			bot.sendMessage(enemy.id, 'Противник сдался');
			win(enemy, user, bot);
		}
		var result = {};
		result.user = user;
		result.enemy = enemy;
		result.enemyN = enemyN;
		return result;
	}

}

function getEffect(item)
{
	var result = {};
	if (item.type == 'Shield') {
		result.attackN = item.attackN;
		result.resist = item.resist;
		result.name = 'shield'
	}
	if (item.type == 'Heal') {
		result.additionalDamage = item.additionalDamage;
		result.attackN = item. attackN;
		result.name = 'heal';
	}
	if (item.type == 'CatchHeal') {
		result.name = 'catch_heal'
		result.heal = item.heal
	}
	return result;
}

function win(user, enemy, bot)
{
	bot.sendMessage(user.id, 'Вы победили!', menu.main_menu);
	bot.sendMessage(enemy.id, 'Вы проиграли', menu.main_menu);
	var experience = (enemy.robot.maxHitPoints - enemy.robot.hitPoints + user.robot.maxHitPoints + user.robot.level) * 2;
	user.robot.experience += experience;
	bot.sendMessage(user.id, 'Вы получили ' + experience + ' опыта', menu.main_menu);
	experience = balance.level_exp_lose[enemy.robot.level - 1];
	enemy.robot.experience += experience;
	bot.sendMessage(enemy.id, 'Вы получили ' + experience + ' опыта', menu.main_menu);
	while(user.robot.experience >= balance.level_exp_need[user.robot.level - 1])
	{
		user.robot.level++;
		user.robot.experience -= balance.level_exp_need[user.robot.level];
		bot.sendMessage(user.id, 'Вы получили уровень!', menu.main_menu);
		user.robot.maxHitPoints = balance[user.robot.level - 1];
	}
	while(enemy.robot.experience >= balance.level_exp_need[enemy.robot.level - 1])
	{
		enemy.robot.level++;
		enemy.robot.experience -= balance.level_exp_need[enemy.robot.level];
		bot.sendMessage(enemy.id, 'Вы получили уровень!', menu.main_menu);
		enemy.robot.maxHitPoints = balance[enemy.robot.level - 1];
	}
	var money = user.robot.level * 2 + enemy.robot.maxHitPoints - enemy.robot.hitPoints - user.robot.maxHitPoints + user.robot.hitPoints;
	user.money += money;
	bot.sendMessage(user.id, 'Вы получили ' + money + ' кредитов', menu.main_menu);
	money = enemy.robot.level;
	enemy.money += money;
	bot.sendMessage(enemy.id, 'Вы получили ' + money + ' кредитов', menu.main_menu);
	enemy.state = 'main_menu';
	user.state = 'main_menu';
	user.robot.effects = [];
	enemy.robot.effects = [];
}

function calculateDamage(effects, damage)
{
	var result = {};
	result.damage = damage;
	result.effects = effects;
	if(effects != null ? effects.length == 0 : true) return result;
	var b;
	for(var i = 0; i < effects.length; i++)
	{
		b = true;
		if(effects[i].name == 'const_sield'){
			damage = damage - effects[i].resist;
			if(damage<0) damage = 0;
		}
		if(effects[i].name == 'sield'){
			damage = damage - effects[i].resist;
			if(damage<0) damage = 0;
			effects[i].attackN = effects[i].attackN - 1;
			if(effects[i].attackN <= 0) {
				effects = removeElement(effects, i);
				i--;
				b = false;
			}
		}
		if(effects[i].name == 'heal' && b){
			damage = damage * (1 + effects[i].additionalDamage);
			effects[i].attackN = effects[i].attackN - 1;
			if(effects[i].attackN <= 0) {
				effects = removeElement(effects, i);
				i--;
				b = false;
			}
		}
		if(effects[i].name == 'catch_heal' && b){
			damage = -effects[i].heal;
			effects[i].attackN = effects[i].attackN - 1;
			effects = removeElement(effects, i);
			i--;
		}
	}
	result.damage = damage;
	result.effects = effects;
}

function removeElement(arr, n)
{
	if(arr == null) return arr;
	if(n>=arr.length || n<0) return arr;
	for(var i = 0; i<arr.length; i++)
	{
		if(i == n)
		{
			for(var j = i; j<arr.length; j++)
			{
				arr[j] = arr[j+1];
			}
		}
	}
	return arr;
}

exports.fight = fight;