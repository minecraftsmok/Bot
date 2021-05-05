const { Collection } = require("discord.js")

const mysql = require("mysql");

const config = require(__dirname + "/../token.json");

const { prefix } = config;

const { readdirSync } = require("fs")

const ascii = require("ascii-table")

const table = new ascii().setHeading("Command", "Load status")

const cooldowns = new Collection()

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "discord"
  })
  
  con.connect(err =>{
    if(err) throw err;
    console.log("Conected to database");
    con.query("SHOW TABLES", console.log)
  })

module.exports = (client) => {
    client.commands = new Collection();

    const commandFiles = readdirSync(__dirname + "/../commands").filter((file) =>
    file.endsWith("command.js")
    )

    for (const file of commandFiles)
    {
        const command = require(__dirname + `/../commands/${file}`)

        if (command.name) 
        {
            client.commands.set(command.name, command)
            table.addRow(file, "✅")
        } else
        {
            table.addRow(file, "❌  -> missing 'name'!")
            continue
        }
    }

    console.log(table.toString())


    client.on('message', (msg) =>
    {
        if(msg.author.bot || !msg.guild) return;
        if (msg.content.startsWith(prefix)) {
        const args = msg.content
          .trim()
          .substring(prefix.length)
          .split(/\s+/);
          const cmdName = args.shift().toLowerCase()
          //Check if the command exists
          if(!client.commands.has(cmdName)) return;

          const cmd = client.commands.get(cmdName)
          //Checks if the command requires an argument 
          if(cmd.args && !args.length)
          return msg.channel.send(`You didn't provide any arguments ${msg.author}`)
          //Check if has cooldowns
          if(!cooldowns.has(cmdName)){
              cooldowns.set(cmdName, new Collection())
          }

          const now = Date.now()
          const timestaps = cooldowns.get(cmdName)
          const cooldownAmount = (cmd.cooldown || 3)*1000
          console.log(cmd.cooldown)

          if(timestaps.has(msg.author.id))
          {
              const expirationTime = timestaps.get(msg.author.id)

              if(now > expirationTime)
              {
                  const timeLeft =(cmd.cooldown || 3)-(expirationTime - now)/1000*-1
                  return msg.reply("Wait " + timeLeft.toFixed(1))
              }
          }
          timestaps.set(msg.author.id, now)
          setTimeout(() =>{
              timestaps.delete(msg.author.id)
          }, cooldownAmount)
          try
          {
              cmd.run(msg, args, con)
          } catch(error) 
          {
              console.log(error)
              message.reply("error")
          }
    }
    });
}