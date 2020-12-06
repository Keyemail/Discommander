const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

module.exports = {
  name: 'membercount',
  description: "gets the member count",
  execute(message, args){
    
if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);

if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {
            
let membersInServer = new Discord.MessageEmbed()
  .setDescription(`There is currentally ${message.guild.memberCount} people in this server.`)
  .addField(`Online:`, message.guild.members.cache.filter(mem => mem.presence.status != "offline").size)
  .addField(`Offline:`, message.guild.members.cache.filter(mem=> mem.presence.status != "online").filter(mem=> mem.presence.status != "dnd").filter(mem=> mem.presence.status != "idle").size)
  .setColor("#2871fa")
message.channel.send(membersInServer)
  
usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}}