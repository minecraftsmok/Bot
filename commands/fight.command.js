const mysql = require("mysql");
module.exports = {
    name: "fight",
    desciption: "",

    run(msg, args, con) 
    {
      con.query(`SELECT * FROM characters WHERE id_user = ${msg.author.id}`, (err, rows) =>{
      if(rows.length>0){
      let cha =[];
      let classes;
      con.query(`SELECT * FROM characters WHERE id_user = ${msg.author.id}`, (err, rows) =>{
        classes = rows[0].class;
        switch (classes)
        {
          case 'warrior':
            cha = [rows[0].hp, rows[0].str];
            break;
          case 'archer':
            cha = [rows[0].hp, rows[0].dex];
            break;
          case 'mag':
            cha = [rows[0].hp, rows[0].inte];
            break;
          default: 
            return;
        }

      let mob=[];
      con.query(`SELECT * FROM mobs WHERE id_mob = 1`, (err, rows) =>{
        mob =[rows[0].hp, rows[0].damage, rows[0].name];
        //FiGHT
        msg.channel.send(`You fight against the **${rows[0].name}**`);
        msg.channel.send(`**${rows[0].name}:** HP:${mob[0]} \n **You:** HP:${cha[0]}`);
        while(mob[0]>0 && cha[0]>0)
        {
          //damgae from user
          mob[0] -=cha[1];
          if(mob[0]<=0)
          return msg.channel.send(`**${rows[0].name}:** HP:${mob[0]} \n **You:** HP:${cha[0]}\n***You won!***`);
          msg.channel.send(`**${rows[0].name}:** HP:${mob[0]} \n **You:** HP:${cha[0]}`);
          //damgae from mob
          cha[0] -=mob[1];
          if(cha[0]<=0)
          return msg.channel.send(`**${rows[0].name}:** HP:${mob[0]} \n **You:** HP:${cha[0]}\n***You lost*** :(`);
          msg.channel.send(`**${rows[0].name}:** HP:${mob[0]} \n **You:** HP:${cha[0]}`);
        }
        return;
      })
    })}})
    }
}