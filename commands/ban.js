const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

module.exports = {
  name: 'ban',
  description: "This command lets you ban a user in your Discord server.",
  execute(message, args){
      
if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);

let doesentHavePermissions = new Discord.MessageEmbed()
  .setDescription("<:no_mark:757685173541404834>  You must have the **Ban Members** permission to execute this command.")
  .setColor("e23333")
if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(doesentHavePermissions)
    
if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {

const user = message.mentions.users.first();
if (user) {
    const member = message.guild.member(user);

if (member) {

let reason = args.slice(2).join(' ');
  
let hasSamePermissions = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  ${user.tag} has the **Ban Members** permission, so i cannot ban this user.`)
  .setColor("#e23333")
if (member.permissions.has("BAN_MEMBERS")) return message.channel.send(hasSamePermissions)

member.ban({reason: reason}).then(() =>{

let banEmbed = new Discord.MessageEmbed()
  .setDescription(`<:yes_mark:757686941780279336>  **${user.tag} has been banned for ${reason || "no reason provided"}**`)
  .setColor("#197b30")
message.channel.send(banEmbed)
    
}).catch(err =>{

let cannotBanUser = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  ${user.tag} has role that is above me, so therefore I cannot ban this user.`)
  .setColor("#e23333")
return message.channel.send(cannotBanUser);
});
  
} else {
    
let errorBanningUser = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  There was a error banning that user.`)
return message.channel.send(errorBanningUser)
}
  
} else {
  
  let invalidUser = new Discord.MessageEmbed()
    .setDescription(`<:no_mark:757685173541404834>  You did not put a valid user.`)
    .addField(`Description:`, `Bans a misbehaved member.`)
    .addField(`Example:`, `cm!ban  @Keyemail posting harmful files in chat`)
    .addField(`Cooldown:`, `5 Seconds`)
    .setColor("#e23333")
  return message.channel.send(invalidUser);
  }
  
usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
  }}}