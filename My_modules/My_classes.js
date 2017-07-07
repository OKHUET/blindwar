function Robot()
{
this.hitPoints = 0;
this.maxHitPoints = 0;
this.level = 1;
this.experience = 0
this.weapon1 = null;
this.weaponCooldown1 = 0;
this.weapon2 = null;
this.weaponCooldown2 = 0;
this.equip1 = null;
this.equipCooldown1 = 0;
this.equip2 = null;
this.equipCooldown2 = 0;
this.effects = [];
} 

function User(telegramUser)
{
this.last_name = telegramUser.last_name;
this.first_name = telegramUser.first_name;
this.username = telegramUser.username;
this.id = telegramUser.id;
this.robot = new Robot();
this.state = "main_menu";
this.money = 100;
this.enemy = null;
this.chatId = telegramUser.id;
this.inventory = [];
this.swapItemN = -1;
}

function Weapon(_weapon)
{
this.name = _weapon.name;
this.id = _weapon.id;
this.type = "Weapon";
this.damage = _weapon.damage;
this.cooldown = _weapon.cooldown;
this.needLevel = _weapon.needLevel;
this.price = _weapon.price;
}

function Shield(_shield)
{
this.id = _shield.id;
this.type = "Shield";
this.resist = _shield.resist;
this.cooldown = _shield.cooldown;
this.needLevel = _shield.needLevel;
this.price = _shield.price;
this.attackN = _shield.attackN;
}

function ConstShield(_constshield)
{
this.id = _constshield.id;
this.type = "ConstShield";
this.resist = _constshield.resist;
this.needLevel = _constshield.needLevel;
this.price = _constshield.price;
}

function Heal(_heal)
{
this.id = _heal.id;
this.type = "Heal"; 
this.needLevel = _heal.needLevel;
this.price = _heal.price;
this.attackN = _heal.attackN;
this.cooldown = _heal.cooldown;
this.heal = _heal.heal;
this.additionalDamage = _heal.additionalDamage;
}

function CatchHeal(_catchheal)
{
this.id = _catchheal.id;
this.type = "CatchHeal"; 
this.heal = _catchheal.heal;
this.cooldown = _catchheal.cooldown;
this.price = _catchheal.price;
this.needLevel = _catchheal.needLevel;
}

function SearchUser(user)
{
	this.id = user.id;
}


exports.User = User;
exports.SearchUser = SearchUser;