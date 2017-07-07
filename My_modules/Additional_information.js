//тут будет вывод "о нас" и "как играть".
function Additional_information(msg,bot) {

    var ChatId = msg.chat.id;
    var txt = msg.text;
  	var about = "Srting about us";
  	var howToPlay = "Srting how to play";

    if (txt === 'О нас') {
      bot.sendMessage(about,ChatId);
    }
    else if (txt === 'Как играть') { 
    	bot.sendMessage(howToPlay,ChatId);
    };
};
exports.Additional_information = Additional_information;
