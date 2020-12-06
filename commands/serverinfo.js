const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  description: "grabs the server info",
  execute(message, args){
      
if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);

if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {

let verificationLevelCustom = {
  "NONE": "None",
  "LOW": "Low",
  "MEDIUM": "Medium",
  "HIGH": "High",
  "VERY_HIGH": "Maximum"
};

let region = {
  "brazil": "Brazil",
  "eu-central": "Central Europe",
  "singapore": "Singapore",
  "us-central": "U.S. Central",
  "sydney": "Sydney",
  "us-east": "U.S. East",
  "us-south": "U.S. South",
  "us-west": "U.S. West",
  "eu-west": "Western Europe",
  "vip-us-east": "VIP U.S. East",
  "london": "London",
  "amsterdam": "Amsterdam",
  "hongkong": "Hong Kong",
  "russia": "Russia",
  "southafrica": "South Africa"
};
  
const serverInfo = new Discord.MessageEmbed()
  .setColor("#2871fa")
  .setThumbnail(message.guild.iconURL({ format: 'png'}))
  .addField("Name:", message.guild.name)
  .addField("ID:", message.guild.id,)
  .addField("Owner:", message.guild.owner.user.tag)
  .addField("Created On:", moment.utc(message.guild.createdAt).format("dddd, MMMM Do, YYYY"))
  .addField("Region", region[message.guild.region])
  .addField("Members:", message.guild.memberCount)
  .addField("Online:", message.guild.members.cache.filter(mem => mem.presence.status != "offline").size)
  .addField("Offline:", message.guild.members.cache.filter(mem=> mem.presence.status != "online").filter(mem=> mem.presence.status != "dnd").filter(mem=> mem.presence.status != "idle").size)
  .addField("Verification Level:", verificationLevelCustom[message.guild.verificationLevel])
message.channel.send(serverInfo)

usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}};