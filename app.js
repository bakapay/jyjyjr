const Discord = require("discord.js");

const client = new Discord.Client();
 
const config = require("./config.json");

client.on("message", async message => {

  if(message.author.bot) return;
  

  if(message.content.indexOf(config.prefix) !== 0) return;
  
 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  client.user.setGame(":x:" , "http://www.twitch.tv/zserifan")
  if(command === "ping") {
    
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
 
    const sayMessage = args.join(" ");
   
    message.delete().catch(O_o=>{}); 
   
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(":x: Nu ai permisiunea de a folosi aceasta comanda");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("```Pune un nume valabil al acestui server.```");
    if(!member.kickable) 
      return message.reply("```Nu pot interzice acest utilizator e mai puternic ca mine... :x:```");
    

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Va rugam puneti un motiv pentru ban.!");
    

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag}A fost interzis de catre ${message.author.tag}pentru ca: ${reason}`);

  }
  
  if(command === "ban") {
  
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(" Nu ai permisiunea de a folosi aceasta comanda");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("```Pune un nume valabil al acestui server.```");
    if(!member.bannable) 
      return message.reply("```Nu pot interzice acest utilizator e mai puternic ca mine... :x:```");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Va rugam puneti un motiv pentru ban.!");
    
    await member.ban(reason)
      .catch(error => message.reply(```Imi pare rau ${message.author} nu am putut interzice din cauza : ${error}```));
    message.reply(`${member.user.tag} A fost interzis de catre ${message.author.tag} pentru ca: ${reason}`);
  }
  
  if(command === "purge") {

    const deleteCount = parseInt(args[0], 10);
  
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Folositi un numar de la 2 pana la 100 pentru a sterge mesajele.");
  
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(```Mesajele nu s-au putut sterge sin cauza: ${error}```));
  }


  if (command === "help") {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor("help", client.user.avatarURL)
    .addField("!help", "```Pentru a vedea lista comenzilor actuale.```")
    .addField("!ban", "```Pentru a interzice un utilizator de pe server.```")
    .addField("!kick", "```Pentru a alunga un utilizator de pe server.```")
    .addField("!userinfo", "```Pentru a vedea informatii despre utilizator.```")
    .addField("!say [text]", "```Va face botul sa spuna ceva.```")
    .addField("!anunt [text]", "```Va face botul să spună un anunț și să-i anunte pe toți```")
    .addField("!avatar", "```Pentru a vedea imaginea utilizatorului.```")
    .addField("!serverinfo", "```Pentru a vedea informatiile serverului.```")
    message.channel.send({embed})
}

if (command === "comenzi") {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("help", client.user.avatarURL)
  .addField("!help", "```Pentru a vedea lista comenzilor actuale.```")
  .addField("!ban", "```Pentru a interzice un utilizator de pe server.```")
  .addField("!kick", "```Pentru a alunga un utilizator de pe server.```")
  .addField("!userinfo", "```Pentru a vedea informatii despre utilizator.```")
  .addField("!say [text]", "```Va face botul sa spuna ceva.```")
  .addField("!anunt [text]", "```Va face botul să spună un anunț și să-i anunte pe toți```")
  .addField("!avatar", "```Pentru a vedea imaginea utilizatorului.```")
  .addField("!serverinfo", "```Pentru a vedea informatiile serverului.```")
  message.channel.send({embed})
}

if (command === "ajutor") {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("help", client.user.avatarURL)
  .addField("!help", "```Pentru a vedea lista comenzilor actuale.```")
  .addField("!ban", "```Pentru a interzice un utilizator de pe server.```")
  .addField("!kick", "```Pentru a alunga un utilizator de pe server.```")
  .addField("!userinfo", "```Pentru a vedea informatii despre utilizator.```")
  .addField("!say [text]", "```Va face botul sa spuna ceva.```")
  .addField("!anunt [text]", "```Va face botul să spună un anunț și să-i anunte pe toți```")
  .addField("!avatar", "```Pentru a vedea imaginea utilizatorului.```")
  .addField("!serverinfo", "```Pentru a vedea informatiile serverului.```")
  message.channel.send({embed})
}

if (command === "anunt") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        const text = args.join(" ")
        if (text.length < 1) return message.channel.send("```Nu pot anunța nimic```");
        
        const embed = new Discord.RichEmbed()
        .setAuthor("anunt", client.user.avatarURL)
        .setColor(0x954D23)
        .setTitle("```Anunt Important:```")
        .setDescription(text);
        message.channel.send("@everyone")
        message.channel.send({embed})
    }
}

if (command === "userinfo"){
let member = message.guild.member(message.author.id);
const millisJoined = new Date().getTime() - member.joinedAt.getTime();
const daysJoined = millisJoined / 1000 / 60 / 60 / 24;

let game = "game"
if(!message.author.presence.game){
 game = "None"
} else {
 game = message.author.presence.name
}

let nickname = "nickname"
if(!message.guild.member(message.author.id).nickname){
 nickname = "None"
} else {
 nickname = message.guild.member(message.author.id).nickname
}

let daysz = "days"
if(daysJoined.toFixed(0) === "1"){
	daysz = " Day"
} else {
    daysz = " Days"
}
	
const authoru = new Discord.RichEmbed()
.setAuthor(message.author.tag, message.author.avatarURL)
.addField("ID", message.author.id, true)
.addField("Nickname", nickname, true)
.addField("Status", message.author.presence.status, true)
.addField("Game", game, true)
.addField("Joined", message.guild.member(message.author.id).joinedAt, true)
.addField("Days since joining", daysJoined.toFixed(0) + daysz, true)
.addField("Roles", message.guild.member(message.author.id).roles.map(r => r.name).join(", "))
.setFooter("Account Created")
.setTimestamp(message.author.createdAt)
.setThumbnail(message.author.avatarURL)
.setColor(0x070707)
if(message.mentions.users.size < 1) return message.channel.send(authoru)
	
let user1 = message.mentions.users.first();
let member2 = message.guild.member(user1.id);
let game2 = "game"
if(!user1.presence.game){
 game2 = "None"
} else {
 game = user1.presence.game.name
}

let nickname2 = "nickname"
if(!message.guild.member(user1.id).nickname){
 nickname2 = "None"
} else {
 nickname = message.guild.member(user1.id).nickname
}

const millisJoined2 = new Date().getTime() - member2.joinedAt.getTime();
const daysJoined2 = millisJoined / 1000 / 60 / 60 / 24;

let daysz1 = "days"
if(daysJoined2.toFixed(0) === "1"){
	daysz1 = " Day"
} else {
    daysz1 = " Days"
}
	
const useru = new Discord.RichEmbed()
.setAuthor(user1.tag, user1.avatarURL)
.addField("ID", user1.id, true)
.addField("Nickname", nickname2, true)
.addField("Status", user1.presence.status, true)
.addField("Game", game2, true)
.addField("Joined", message.guild.member(user1.id.joinedAt), true)
.addField("Days since joining", daysJoined2.toFixed(0) + daysz1, true)
.addField("Roles", message.guild.member(user1.id).roles.map(r => r.name).join(", "))
.setFooter("Account Created")
.setTimestamp(user1.createdAt)
.setThumbnail(user1.avatarURL)
.setColor(0x070707)
if(message.mentions.users.size > 1) return message.channel.send(useru)
}

if (command === "serverinfo") {
  let icon = "icon"
  if(!message.guild.iconURL){
  icon = message.author.avatarURL
  } else {
  icon = message.guild.iconURL
  }
  
      const embed = new Discord.RichEmbed()
      .setAuthor(message.guild, icon)
      .addField("ID", message.guild.id, true)
      .addField("Name", message.guild, true)
      .addField("Owner", message.guild.owner.user.tag, true)
      .addField("Region", message.guild.region, true)
      .addField("Channels", message.guild.channels.size, true)
      .addField("Members", message.guild.memberCount, true)
      .addField("Humans", message.guild.members.filter(m => !m.user.bot).size, true)
      .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
      .addField("Online", message.guild.members.filter(m => m.presence.status !== 'offline').size, true)
      .addField("Roles", message.guild.roles.size, true)
      .addField("Role List", message.guild.roles.map(r => r.name).join(", "))
      .setTimestamp(message.guild.createdAt)
      .setFooter("Server Created")
      .setColor("RANDOM")
      .setThumbnail(icon)
          message.channel.sendEmbed(embed)
}

if (command === "avatar") {
  const myavatar = new Discord.RichEmbed()
  .setImage(message.author.avatarURL)
  .setColor("RANDOM");
  if(message.mentions.users.size < 1) return message.channel.sendEmbed(myavatar)
  const avatar = new Discord.RichEmbed()
  .setImage(message.mentions.users.first().avatarURL)
  .setColor("RANDOM")
  message.channel.sendEmbed(avatar)
}
});
client.login(process.env.BOT_TOKEN);
