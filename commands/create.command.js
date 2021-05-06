const mysql = require("mysql");
const one ="⚔️";
const two ="🏹";
const three ="🪄";
module.exports = {
    name: "createme",
    desciption: "create his characters",
    cooldown: 25,

    async run(msg, args, con) 
    {
      con.query(`SELECT * FROM characters WHERE id_user = ${msg.author.id}`, async (err, rows) =>{
        if(rows.length>0)
        return msg.reply('You have already chosen a class before');
        let mesg = await msg.reply('Select your characters:\nWarrior ⚔️\nArcher 🏹\nMag 🪄');
        await mesg.react(one)
        await mesg.react(two)
        await mesg.react(three)
        const reactions = await mesg.awaitReactions((reaction, user) => user.id === msg.author.id && (reaction.emoji.name === one || reaction.emoji.name === two || reaction.emoji.name === three), {time: 5000})
        if(reactions.has(one)&&!reactions.has(two)&&!reactions.has(three))
        {
          con.query(`INSERT INTO characters (id, id_user, class, lvl, weapon hp, str, dex, inte, gold) VALUES (NULL, ${msg.author.id}, 'warrior', '1', '7', '10', '10', '10', '10', '0');`);
          return msg.reply('You have just become a warrior');
        }
        else if(reactions.has(two)&&!reactions.has(one)&&!reactions.has(three))
        {
          con.query(`INSERT INTO characters (id, id_user, class, lvl, hp, str, dex, inte, gold) VALUES (NULL, ${msg.author.id}, 'archer', '1', '6', '10', '10', '10', '10', '0');`);
          return msg.reply('You have just become an archer');
        }
        else if(reactions.has(three)&&!reactions.has(two)&&!reactions.has(one))
        {
          con.query(`INSERT INTO characters (id, id_user, class, lvl, hp, str, dex, inte, gold) VALUES (NULL, ${msg.author.id}, 'mag', '1', '8', '10', '10', '10', '10', '0');`);
          return msg.reply('You have just become a mag');
        }
    return msg.reply('Please select warrior, mag or archer');
  })
    }
}