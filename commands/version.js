const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

const version = "v4.2"

const discordjsv = "Discord.js v12.5.0";

module.exports = {
  name: 'version',
  description: "gets version of the bot",
  execute(message, args){
      
if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);
    
if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {

let botVersion = new Discord.MessageEmbed()
  .setDescription(`Running on ${version} and on ${discordjsv}`)
  .setColor("#2871fa")
message.channel.send(botVersion)

usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}}
