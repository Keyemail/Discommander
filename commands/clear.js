const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

module.exports = {
  name: 'clear',
  description: "Clears messages in your Discord server.",
  execute(message, args){

if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);

let doesentHavePermissions = new Discord.MessageEmbed()
  .setDescription("<:no_mark:757685173541404834>  You must have the **Manage Messages** permission to execute this command.")
  .setColor("e23333")
if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(doesentHavePermissions)

if(usedCommandRecently.has(message.author.id)){
   message.reply("You are on cooldown, wait 5 seconds please.")
} else {

const dinnitGiveNumber = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  You did not specify how much to delete.`)
  .addField(`Description:`, `Clears a certain amount of text in a voice channel`)
  .addField(`Example:`, `cm!clear 0-100`)
  .addField(`Cooldown`, `5 Seconds`)
  .setColor("#e23333")
if (!args[1]) return message.channel.send(dinnitGiveNumber)

message.channel.bulkDelete(args[1])

const deletedText = new Discord.MessageEmbed()
  .setDescription(`<:yes_mark:757686941780279336>  Cleared ${args[1]} amount of text`)
  .setColor("#197b30")
message.channel.send(deletedText).then(message => message.delete({ timeout: 20000 }));

usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}}