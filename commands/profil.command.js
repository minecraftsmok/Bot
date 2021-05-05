const mysql = require("mysql");
const { MessageEmbed, User } = require("discord.js");
module.exports = {
  name: "profil",
  desciption: "Info embed",
  run(msg,args,con) 
  {
    const member = msg.mentions.members.first();
    if(!member) return msg.reply('Please mention someone');
    con.query(`SELECT * FROM characters WHERE id_user = ${member.id}`, (err, rows) =>{
      if(rows.length>0)
      {
        let n = rows[0].class
        let c;
        switch (n) 
        {
          case "warrior":
            c='Warrior';
            break;
          case "archer":
            c='Archer';
            break;
          case "mag":
            c='Mag';
            break;
          default:
          c='???';
        }
        console.log(member.user.username);
        const embed = new MessageEmbed()
        .setTitle(`${member.user.username}`)
        .setColor(0xffff00)
        .setDescription('Statistics')
        .addField('Professional', c, true)
        .addField('Gold', rows[0].gold, true)
        .addField('Strength ', rows[0].str, true)
        .addField('Dexterity', rows[0].dex, true)
        .addField('Intelligence', rows[0].inte, true)
        return msg.channel.send(embed);
      }
      else
      return msg.channel.send('No');
    })
  }
}