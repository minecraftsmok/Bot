const { Message } = require("discord.js");
const mysql = require("mysql");
const quiz = require('./quiz.json');
const item = quiz[Math.floor(Math.random() * quiz.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};

module.exports = {
    name: "quiz",
    desciption: "create his characters",

    async run(msg, args, con) 
    {
      msg.channel.send(item.question).then(() => {
        msg.channel.awaitMessages(filter, { max: 1, time: 5000, errors: ['time'] })
          .then(collected => {
            msg.channel.send(`${collected.first().author} got the correct answer!`);
          })
          .catch(collected => {
            msg.channel.send('Looks like nobody got the answer this time.');
          });
      });
    }
}