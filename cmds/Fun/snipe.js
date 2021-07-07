const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "snipe",
 category: 'Fun',
 description: "Get a snipe of your choice in the channel!",
 usage: "[snipe number]",
 category: "fun",
 execute: async (message, Member, args) => {
   const snipes = message.client.snipes.get(message.channel.id) || [];
   const msg = snipes[args[0] - 1 || 0];
   if (!msg) return message.channel.send(`${require('../../emojis.json').x} There's nothing to snipe!`);
   const Embed = new MessageEmbed()
     .setAuthor(
       msg.author.tag,
       msg.author.displayAvatarURL({ dynamic: true, size: 256 })
     )
     .setColor(message.client.confiig.color)
     .setDescription(msg.content)
     .setFooter(`Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`);
   if (msg.attachment) Embed.setImage(msg.attachment);
   message.channel.send(Embed);
 },
};