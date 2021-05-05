const { Message } = require("discord.js");
const mysql = require("mysql");


module.exports = {
    name: "edit",
    desciption: "create his characters",

    async run(msg, args, con) 
    {
        msg.channel.send('Fortnite')
        .then((msg) => {setTimeout(function() {
            msg.edit('Minecraft');
        }, 1000)});  
    }
}