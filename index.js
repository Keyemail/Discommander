const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

const PREFIX = (process.env.prefix);

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
  
  } 

client.on('ready', () => {
    console.log(`${client.user.username} IS NOW ONLINE`)
    client.user.setActivity(`cm!help | Discommander`)
  });

client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    
    let welcomeEmbed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL(), "https://top.gg/bot/711822154643275847")
      .setColor("#2871fa")
      .setDescription(`Hey, thanks for inviting ${client.user.username} to your server! The Discord bot that needs no setup at all! Discords role permissions let you control the bot! We hope you have a wonderful time with this bot, its designed to help moderate and help out your server!`)
      .addField(`__Help:__`, `Need help finding out commands or permissions? Do cm!help in your server that you invited you're bot in to get starts and see all the permssions and commands!`)
      .addField(`__Privacy:__`, `None of your data from your server or from you can be seen by anyone. We take privacy very seriously and we do NOT download or view any of your information.`)
      .addField(`__Suppport:__`, `Need support? Click [here](https://discord.gg/naa5pwV) to join our discord server to hang out and chill or to ask questions or request features for our bot. You can join any time and its free!`)
      .setFooter(`Discommander2020`, client.user.avatarURL())
      .setTimestamp()
    channel.send(welcomeEmbed).catch(err => console.log);
})

  client.on('message', message => {
  
  if (!message.content.toLowerCase().startsWith(PREFIX)) return;

  let args = message.content.toLowerCase().substring(PREFIX.length).split(" ");

  switch (args[0]) {
      case "mute":
        client.commands.get('mute').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "unmute":
        client.commands.get('unmute').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "clear":
        client.commands.get('clear').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "serverinfo":
        client.commands.get('serverinfo').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "profile":
        client.commands.get('profile').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "version":
        client.commands.get('version').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "kick":
        client.commands.get('kick').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "ban":
        client.commands.get('ban').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "help":
        client.commands.get('help').execute(message, args);
     break;
  }
  switch (args[0]) {
      case "members":
        client.commands.get('membercount').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "botnick":
        client.commands.get('botnick').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "nick":
        client.commands.get('nick').execute(message, args);
      break;
  }
  switch (args[0]) {
      case "slowmode":
        client.commands.get('slowmode').execute(message, args);
      break;
  }
  });

client.login(process.env.token)