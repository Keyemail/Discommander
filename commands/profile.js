const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: 'profile',
  description: "grabs the profile of a user",
  execute(message, args){
      
if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);

if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {

const user = message.mentions.users.first();
  
if (user) {
  const member = message.guild.member(user);

let userstatus = {
  "online": "Online",
  "idle": "Idle",
  "dnd": "Do Not Disturb",
  "offline": "Offline"
}
  
const userProfile = new Discord.MessageEmbed()
  .setColor("#2871fa")
  .setThumbnail(user.displayAvatarURL())
  .addField("Discord Name:", user.username)
  .addField("Discord Tag:", "#" + user.discriminator)
  .addField("Discord ID:", user.id, true)
  .addField("Discord Status:", userstatus[user.presence.status])
  .addField("Joined Discord:", moment.utc(message.guild.members.cache.get(user.id).user.createdAt).format("dddd, MMMM Do, YYYY"))
  .addField("Joined Server:", moment.utc(message.guild.members.cache.get(user.id).joinedAt).format("dddd, MMMM Do, YYYY"))
message.channel.send(userProfile);
  
} else {
  
let invalidUser = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  You did not put a valid user`)
  .addField(`Description:`, `Shows information about a Discord user.`)
  .addField(`Example:`, `cm!profile @Keyemail`)
  .addField(`Cooldown:`, `5 Seconds`)
  .setColor("#e23333")
return message.channel.send(invalidUser);

usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}}}