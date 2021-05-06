const { Message } = require("discord.js");
const mysql = require("mysql");
let son = require('../mobs/rat.json');
const jsonText = JSON.stringify(son)
son = JSON.parse(jsonText)
let pstr=0, pdex=0, pinte=0, php=0, parmor=0, plvl, pexp, ptype, pmin=1, pmax=2
let player ={}

module.exports = {
    name: "walka",
    desciption: "create his characters",

    async run(msg, args, con) 
    {
      console.log(son)
      con.query(`SELECT * FROM characters WHERE id_user = ${msg.author.id}`, async (err, rowss) =>{
        if(rowss.length<1)
        return
        con.query(`SELECT * FROM items WHERE id_item IN (${rowss[0].helmet},${rowss[0].breastplate},${rowss[0].trousers},${rowss[0].shoes},${rowss[0].weapon})ORDER BY type_item ASC`, async (err, rows) =>{
          for(let key in rows)
            php+=rows[key].hp
          for(let key in rows)
            pstr+=rows[key].str
          for(let key in rows)
            pdex+=rows[key].dex
          for(let key in rows)
            pinte+=rows[key].inte
          for(let key in rows)
            parmor+=rows[key].armor
          for(let key in rows)
            pmin=rows[key].min_dam
          for(let key in rows)
            pmax=rows[key].max_dam
          php+=rowss[0].hp; pstr+=rowss[0].str;pdex+=rowss[0].dex;pinte+=rowss[0].inte;plvl=rowss[0].lvl;pexp=rowss[0].exp;ptype=rowss[0].class
          player = {
            Type: ptype,
            Hp: php,
            Lvl: plvl,
            MinDamage: pmin,
            MaxDamage: pmax,
            Strength: pstr,
            Dexterity: pdex,
            Intelligence: pinte,
            Armor: parmor,
            Id: msg.author.id
          }
          console.log(player)
        })
      })
    }
}