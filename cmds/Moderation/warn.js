const Discord = require('discord.js');

module.exports = {
  name: 'warn',
  category: 'Moderation',
  description: 'Warn a user',
  async execute(message, Member, args) {
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
      let usertosend = message.mentions.users.first() || message.client.users.cache.get(args[0]);
      if(!usertosend) return
      let reason = args[1]
      const m = await message.channel.send({ embeds: [
          new Discord.MessageEmbed()
          .setTitle(`${usertosend.tag} has been warned`)
          .addField(`Reason:`, `${reason ?? 'None'}`)
          .setColor(message.client.confiig.color)
      ]});
      usertosend.send({ embeds: [
        new Discord.MessageEmbed()
        .setTitle(`You have been warned`)
        .addField(`Reason:`, `${reason ?? 'None'}`)
        .setColor(message.client.confiig.color)
      ]})
    }
  },
};