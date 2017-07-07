//поиск нужного элемента и его номера в массиве по id(бинарный поиск)
//принимает массив, элемент который ищем, верхнюю и нижнюю границы поиска
//позвращает пользоватея и его номер в массиве
function IdBinSearch(arr, searchElement, h, l)
{
	var result = [];
	if(l>h){
		return null
	}
	if(!arr[0].id)
	{
		return null;
	}
	if(l===h)
	{
		if(arr[l].id === searchElement.id)
		{
			result['user'] = arr[l];
			result['userN'] = l;
			return result;
		}
		else
		{
			return null	
		}
	}
	else
	{
		if (l+1 === h)
		{
			if(arr[l].id === searchElement.id)
			{
				result['user'] = arr[l];
				result['userN'] = l;
				return result;
			}
			else
			{
				if(arr[h].id === searchElement.id)
				{
					result['user'] = arr[h];
					result['userN'] = h;
					return result;
				}
				else
				{
					return null
				}
			}
		}
		else
		{
			var m = Math.floor((l + h)/2);
			if (arr[m].id === searchElement.id)
			{
				result['user'] = arr[m];
				result['userN'] = m;
				return result;
			}
			else
			{
				if(searchElement.id>arr[m].id)
				{
					return IdBinSearch(arr, searchElement, h, m+1)
				}
				else
				{
					return IdBinSearch(arr, searchElement, m-1, l)
				}
			}
		}
	}
}

//вставка в отсортированный по id массив
//принимает массив и элемент, который надо вставить
//возвращает обновлённый массив и номер вставленного элемента
function InsertById(users, user)
{
	var i;
	for(i = users.length; i>=0; i--)
	{
		if(i>0)
		{
			if(user.id<users[i-1].id)
			{
				users[i] = users[i-1]
			}
			else
			{
				users[i] = user;
				break
			}
		}
		else
		{
			users[0] = user;
		}
	}
	var result = [];
	result['users'] = users;
	if(i===-1)
	{
		i=0;
	}
	result['userN'] = i;
	return result;
}


function CreateFightKeyboard(robot)
{
	var e1 = 'ПУСТО';
	var e2 = 'ПУСТО';
	if(robot.equip1 !=null)
	{
		if (robot.equip1.type == 'ConstShield') {
			e1 = robot.equip1.name + "(" + robot.equip1.resist + ")";
		}
		if (robot.equip1.type == 'Shield') {
			e1 = robot.equip1.name + "(" + robot.equip1.resist + "/" + robot.equip1.attakN + "/" + robot.equip1.cooldown + ")";
		}
		if (robot.equip1.type == 'Heal') {
			e1 = robot.equip1.name + "(" + robot.equip1.heal + "/" + robot.equip1.additionalDamage +"%/" + robot.equip1.attackN + "/" + robot.equip1.cooldown + ')';
		}
		if (robot.equip1.type == 'CatchHeal') {
			e1 = robot.equip1.name + "(" + robot.equip1.heal + "/" + robot.equip1.healTime+ + "/" + robot.equip1.cooldown + ')';
		}
	}
	if(robot.equip2 !=null)
	{
		if (robot.equip2.type == 'ConstShield') {
			e2 = robot.equip2.name + "(" + robot.equip2.resist + ")";
		}
		if (robot.equip2.type == 'Shield') {
			e2 = robot.equip2.name + "(" + robot.equip2.resist + "/" + robot.equip2.attakN + "/" + robot.equip2.cooldown + ")";
		}
		if (robot.equip2.type == 'Heal') {
			e2 = robot.equip2.name + "(" + robot.equip2.heal + "/" + robot.equip2.additionalDamage +"%/" + robot.equip2.attackN + "/" + robot.equip2.cooldown + ')';
		}
		if (robot.equip2.type == 'CatchHeal') {
			e2 = robot.equip2.name + "(" + robot.equip2.heal + "/" + robot.equip2.healTime+ + "/" + robot.equip2.cooldown + ')';
		}
	}
	return {
		reply_markup : {
			keyboard : [
				[
					{text : robot.weapon1!=null ? robot.weapon1.name + '(' + robot.weapon1.damage + '/' + robot.weapon1.cooldown + ')' : 'ПУСТО'},
					{text : robot.weapon2!=null ? robot.weapon2.name + '(' + robot.weapon2.damage + '/' + robot.weapon2.cooldown + ')' : 'ПУСТО'}
				],
				[
					{text : e1},
					{text : e2}
				],
				[
					{text : 'СДАТЬСЯ'}
				]
			],
			resize_keyboard : true
		}
	}
}
/*
//пока не раюотает
function SearchNearest(arr, loc)
{
	
} 

//построение магазинного меню(добавление к шаблону цен и баланса)
function GetShopMenu(_user)
{
	var menu = jf.readFileSync('./data/menu/shop_menu.json');
	var armorCost = require('./data/prices/armor_price.json').Cost[_user.armorLevel];
	var weaponCost = require('./data/prices/weapon_price.json').Cost[_user.weaponLevel];
	menu.keyboard[1][1].text += '(' + armorCost + ')';
	menu.keyboard[1][0].text += '(' + weaponCost + ')';
	menu.keyboard[2][0].text += _user.money;
	return menu
}
*/

exports.CreateFightKeyboard = CreateFightKeyboard;
exports.IdBinSearch = IdBinSearch;
exports.InsertById = InsertById;
