const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

module.exports = {
  name: 'slowmode',
  description: "puts a time limit on chat",
  execute (message, args){
      
if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);
    
let doesentHavePermissions = new Discord.MessageEmbed()
  .setDescription("<:no_mark:757685173541404834>  You must have the **Manage Channels** permission to execute this command.")
  .setColor("e23333")
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send(doesentHavePermissions)
    
if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {
        
let noSpecifiedTime = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  You did not put a time`)
  .addField(`Description:`, `Changed the slowmode to any channel.`)
  .addField(`Example:`, `cm!slowmode 30`)
  .addField(`Cooldown:`, `5 Seconds`)
  .setColor("#e23333")
if(!args[1]) return message.channel.send(noSpecifiedTime)

let timeIsNotNumber = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  The time you set was not a number.`)
  .addField(`Description:`, `Changed the slowmode to any channel.`)
  .addField(`Example:`, `cm!slowmode 30`)
  .addField(`Cooldown:`, `5 Seconds`)
  .setColor("#e23333")
if (isNaN(args[1])) return message.channel.send(timeIsNotNumber);

let overTheLimit = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  The time you set is over the limit.`)
  .addField(`Description:`, `Changed the slowmode to any channel.`)
  .addField(`Example:`, `cm!slowmode 30`)
  .addField(`Cooldown:`, `5 Seconds`)
  .setColor("#e23333")
if (parseInt(args[1]) > 21600) return message.channel.send(overTheLimit)
        
let duration = args[1]
     
message.channel.setRateLimitPerUser(duration)
        
let setSlowmodeTime = new Discord.MessageEmbed()
  .setDescription(`<:yes_mark:757686941780279336>  **Slowmode on this channel has been set to ${duration} seconds.**`)
  .setColor("#197b30")
message.channel.send(setSlowmodeTime)

usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}};