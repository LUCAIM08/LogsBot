const Discord = require("discord.js")
const config = require("./config.json")

require('discord-reply');
const client = new Discord.Client({
    intents: 32767
})

client.once("ready", () => {
    console.log("Ready")
})

//message detect
client.on("message", message => {
    if(message.author.id === config.botId) return;
    var embed = new Discord.MessageEmbed()
    .setColor("#5211c2")
    .setTitle("New message sent!")
    .setDescription(`Channel type: **${message.channel.type}**`)
    .setThumbnail(message.author.displayAvatarURL())
    .addField("Message Content", `${message.content}`, true)
    .addField("User", `${message.author.username}#${message.author.discriminator}`, false)
    .setTimestamp()

    client.channels.cache.get(config.LogsChannel).send(embed)
})

//member-join detect
client.on("guildMemberAdd", member => {
    var embed = new Discord.MessageEmbed()
    .setColor("#ed39ab")
    .setTitle("New member!")
    .setDescription(`A new member has joined!`)
    .setThumbnail(member.user.displayAvatarURL())
    .addField("Member Id", `${member.id}`, true)
    .addField("Name", `${member.user.username}#${member.user.discriminator}`, true)
    .setTimestamp()

    client.channels.cache.get(config.LogsChannel).send(embed)
})

//member-leave detect
client.on("guildMemberRemove", member => {
    var embed = new Discord.MessageEmbed()
    .setColor("#ed39ab")
    .setTitle("Member exited!")
    .setDescription(`A new member has leaved!`)
    .setThumbnail(member.user.displayAvatarURL())
    .addField("Member Id", `${member.id}`, true)
    .addField("Name", `${member.user.username}#${member.user.discriminator}`, true)
    .setTimestamp()

    client.channels.cache.get(config.LogsChannel).send(embed)
})

//message-delete detect
client.on("messageDelete", message => {
    var embed = new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle("Message deleted!")
    .setDescription(`A message just got deleted!`)
    .setThumbnail(message.author.displayAvatarURL())
    .addField("Content", `${message.content}`, true)
    .addField("Message sender", `${message.author.username}#${message.author.discriminator}`, true)
    .setTimestamp()

    client.channels.cache.get(config.LogsChannel).send(embed)
})

//channel-create detect
client.on("channelCreate", channel => {
    var embed = new Discord.MessageEmbed()
    .setColor("#548922")
    .setTitle("Channel created!")
    .setDescription(`A channel just got created!`)
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Details", `No more details`, true)
    .setTimestamp()

    client.channels.cache.get(config.LogsChannel).send(embed)
})

//channel-deleted detect
client.on("channelDelete", channel => {
    var embed = new Discord.MessageEmbed()
    .setColor("#548922")
    .setTitle("Channel created!")
    .setDescription(`A channel just got created!`)
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Details", `No more details`, true)
    .setTimestamp()

    client.channels.cache.get(config.LogsChannel).send(embed)
})

//call-staff command
client.on("message", message => {
    if(message.content.startsWith("l!callstaff")) {
        if(message.author.id === config.botId) return;
    var embed = new Discord.MessageEmbed()
    .setColor("#5211c2")
    .setTitle("[CALL] - STAFF")
    .setDescription(`Channel type: **${message.channel.type}**`)
    .setThumbnail(message.author.displayAvatarURL())
    .addField("Channel", `<#${message.channel.id}>`, true)
    .addField("User", `${message.author.username}#${message.author.discriminator}`, false)
    .setTimestamp()
    
    client.channels.cache.get(config.LogsChannel).send(`<@&${config.staffId}>`)
    client.channels.cache.get(config.LogsChannel).send(embed)
    message.lineReply('You called staff correctly!') //Reply without mention
    }
})

client.login(config.token);
