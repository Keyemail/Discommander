const Discord = require('discord.js');
const client = new Discord.Client();

const usedCommandRecently = new Set();

module.exports = {
  name: 'kick',
  description: "Kicks a player out of the server.",
  execute(message, args){

if (message.channel instanceof Discord.DMChannel) return message.author.send("You can not use this bot in Direct Messages").catch(err => console.log);

let doesentHavePermissions = new Discord.MessageEmbed()
  .setDescription("<:no_mark:757685173541404834>  You must have the **Kick Members** permission to execute this command.")
  .setColor("e23333")
if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(doesentHavePermissions)

if(usedCommandRecently.has(message.author.id)){
  message.reply("You are on cooldown, wait 5 seconds please.")
} else {

const user = message.mentions.users.first();
if (user) {
    const member = message.guild.member(user);

if (member) {
let reason = args.slice(2).join(' ');
  
member.kick(reason).then(() => {
    
let kickEmbed = new Discord.MessageEmbed()
  .setDescription(`<:yes_mark:757686941780279336>  **${user.tag} has been kicked for ${reason || "no reason provided"}**`)
  .setColor("#197b30")
message.channel.send(kickEmbed)

  }).catch(err =>{

    message.channel.send('<:no_mark:757685173541404834>  Something went wrong while kicking that user.')

  });
} else {

  message.channel.send('<:no_mark:757685173541404834>  Something went wrong while kicking that user.')

}

} else {

let invalidUser = new Discord.MessageEmbed()
  .setDescription(`<:no_mark:757685173541404834>  You did not put a valid user`)
  .addField(`Description:`, `Kicks a misbehaved member.`)
  .addField(`Example:`, `cm!kick  @Keyemail spamming in chat after 3 warnings`)
  .addField(`Cooldown:`, `5 Seconds`)
  .setColor("#e23333")
return message.channel.send(invalidUser);

}

usedCommandRecently.add(message.author.id);
setTimeout(() =>{
  usedCommandRecently.delete(message.author.id)
}, 5000)
}}}