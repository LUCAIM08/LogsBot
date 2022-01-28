const Discord = require("discord.js")
const config = require("./config.json")

const client = new Discord.Client({
    intents: 32767
})

client.once("ready", () => {
    console.log("Ready")
})

client.on("messageCreate", message => {
    var embed = new Discord.MessageEmbed()
    .setColor("#5211c2")
    .setTitle("New message sent!")
    .setDescription(`Channel type: **${message.channel.type.toString()}**`)
    .addField("Message Content", `${message.content.toString()}`, true)
    .addField("User", `${message.author.username.toString()}#${message.author.discriminator.toString()}`, false)

    client.channels.cache.get(config.LogsChannel).send({embeds: [embed]})
})

client.login(config.token);