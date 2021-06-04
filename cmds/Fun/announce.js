const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
module.exports = {
  name: "announce",
  category: 'Fun',
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel> <msg>",
  async execute(message, Member, args) {
    const announceemoji = message.client.emojis.cache.get('847574692390633523');
    const rChannel = message.mentions.channels.first()
    if (!rChannel)
      return message.channel.send(
        new Discord.MessageEmbed()
        .setTitle(`You did not specify your channel to send the announcement too!`)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(`RED`)
      );
    let MSG = args[1]
    if (!MSG)
      return message.channel.send(
      new Discord.MessageEmbed() 
      .setTitle(`You did not specify your message to send!`)
      .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setColor(`RED`)
      )
    const _ = new Discord.MessageEmbed()
      .setTitle(`Announcement! ${announceemoji}`)
      .setDescription(`${MSG}`)
      .setColor(message.client.confiig.color);
    const m = await rChannel.send(_);
    message.reply(
      new Discord.MessageEmbed()
      .setTitle(`Sent!`)
      .setDescription(`[View](${m.url})`)
      .setColor(message.client.confiig.color)
    );
    message.delete();
  },
};