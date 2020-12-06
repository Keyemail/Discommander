const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

module.exports = {
  name: 'nick',
  description: "lets player nickname himself",
  execute(message, args){
      
if (message.channel instanceof Discord.DMChannel) return message.channel.send("You can not use this bot in Direct Messages").catch(err => console.log)
    
let doesentHavePermissions = new Discord.MessageEmbed()
  .setDescription("<:no_mark:757685173541404834>  You must have the **Change Nickname** permission to execute this command.")
  .setColor("e23333")
if (!message.member.permissions.has("CHANGE_NICKNAME")) return message.channel.send(doesentHavePermissions)

if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {
            
let resetNickname = new Discord.MessageEmbed()
  .setColor("#197b30")
  .setDescription(`<:yes_mark:757686941780279336>  **Your nickname has been reset**`)
if(!args[1]) return [message.guild.members.cache.get(message.member.id).setNickname(message.member.user.username), message.channel.send(resetNickname), usedCommandRecently.add(message.author.id), setTimeout(() =>{ usedCommandRecently.delete(message.author.id) }, 5000)]

let userNickname = args.slice(1).join(' ');

message.guild.members.cache.get(message.member.id).setNickname(userNickname);

let changedNickname = new Discord.MessageEmbed()
  .setColor("#197b30")
  .setDescription(`<:yes_mark:757686941780279336>  **Successfully changed your nickname to ${userNickname}**`)
message.channel.send(changedNickname);
          
usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}}