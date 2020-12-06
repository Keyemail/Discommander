const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

module.exports = {
  name: 'help',
  description: "gets help command",
  execute(message, args){

  if (message.channel instanceof Discord.DMChannel) return message.channel.send("You can not use this bot in Direct Messages").catch(err => console.log);

  if(usedCommandRecently.has(message.author.id)){
    message.reply("You are on cooldown, wait 5 seconds please.")
  } else {

  let sentDM = new Discord.MessageEmbed()
    .setDescription(`<:yes_mark:757686941780279336>  I have sent you a message in Direct Messages!`)
    .setColor("#197b30")
  message.channel.send(sentDM)

  const embed = new Discord.MessageEmbed()
    .setAuthor(message.client.user.username, message.client.user.avatarURL(), "https://top.gg/bot/711822154643275847")
    .setTitle("Command List For Discommander")
    .setColor("#2871fa")
    .addField(`cm!ban`, `This allows you to ban anyone that is behaiving bad on a server. This command is only avaible to those who have **Ban Members** permission.`)
    .addField(`cm!kick`, `This allows you to kick anyone that is behaiving bad on a server. This command is only avaible to those who have **Kick Members** permission.`)
    .addField(`cm!clear`, `This allows you to clear large amounts of text in a server. This command is only avaible to those who have **Manage Messages** permission.`)
    .addField(`cm!slowmode`, `This allows you to set any amount of slowmode to your choosing. This command is only avaible to those who have **Manage Channels** permission.`)
    .addField(`cm!version`, `This allows you to see the version this bot is running on. This command is avaible to anyone that types this command.`)
    .addField(`cm!serverinfo`, `This allows you to see the server information with details. This command is avaible to anyone that types this command.`)
    .addField(`cm!profile`, `This allows you to see the profile information with details. This command is avaible to anyone that types this command.`)
    .addField(`cm!nick`, `This allows you to change your nickname to what you choose on the server. This command is avaible to anyone that types this command.`)
    .addField(`cm!members`, `This allows you to see the amount of members, the members online and offline. This command is avaible to anyone that types this command.`)
    .addField(`cm!help`, `This allows you to see all the commands and there permissions to activate it. This command is avaible to anyone that types this command.`)
    .setFooter(`Discommander2020`, message.client.user.avatarURL())
    .setTimestamp()
  message.author.send({embed});

  usedCommandRecently.add(message.author.id);
    setTimeout(() =>{
      usedCommandRecently.delete(message.author.id)
  }, 5000)

  }}}