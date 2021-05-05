const { Message } = require("discord.js");
const mysql = require("mysql");

const one ="1️⃣";
const two ="2️⃣";
const three ="3️⃣";
module.exports = {
    name: "test",
    desciption: "create his characters",
    cooldown: 15,

    async run(msg, args, con) 
    {
      let mesg = await msg.channel.send('Vote');
      await mesg.react(one)
      await mesg.react(two)
      await mesg.react(three)
      const reactions = await mesg.awaitReactions((reaction, user) => user.id === msg.author.id && (reaction.emoji.name === one || reaction.emoji.name === two || reaction.emoji.name === three), {time: 5000})
      msg.channel.send(reactions.has(one)+ ' ' + reactions.has(two) + ' ' +  reactions.has(three));
    }
}