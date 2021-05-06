const {Client} = require('discord.js');
const client = new Client({ partials: ["MESSAGE", "REACTION"]});
const config = require("./token.json");
const { token } = config;
const commandHandler = require("./handlers/command.handler");

commandHandler(client);

client.once('ready',()=> {
  client.user.setPresence({ activity : { name: "Minecraft", status: "online"}});
  console.log(`I am ready ${client.user.tag}`)

});

client.on('messageReactionAdd', (reaction, user) => {
})
client.on('messageDelete', message => {
})

client.login(token);