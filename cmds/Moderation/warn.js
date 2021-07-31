const Discord = require('discord.js');
const emojis = require('../../emojis.json');
const modm = require('../../models/Moderation/mod_manager');

module.exports = {
  name: 'warn',
  category: 'Moderation',
  description: 'Warn a user',
  permissions: 'MANAGE_MESSAGES',
  usage: '<user> <reason>',
      /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.User} Member 
     * @param {[String]} args 
     */
  async execute(message, Member, args) {
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
      let usertosend = message.mentions.users.first() || message.client.users.cache.get(args[0]);
      let reason = args[1];
      if(!usertosend) return message.channel.send({ content: `${emojis.xmark} Incorrect usage! **Correct usage:** \`${message.client.config.prefix}${this.name} ${this.usage}\``})
      if(!reason) return message.channel.send({ content: `${emojis.xmark} Incorrect usage! **Correct usage:** \`${message.client.config.prefix}${this.name} ${this.usage}\``})
      const m = await message.channel.send({ embeds: [
          new Discord.MessageEmbed()
          .setDescription(`${emojis.ban} ${usertosend.tag} has been warned`)
          .addField(`${emojis.flag_redo} Reason:`, `${reason ?? 'None'}`)
          .setColor(message.client.confiig.color)
      ]});
      usertosend.send({ embeds: [
        new Discord.MessageEmbed()
        .setDescription(`${emojis.ban} You have been warned!`)
        .addField(`${emojis.flag_redo} Reason:`, `${reason ?? 'None'}`)
        .setColor(message.client.confiig.color)
      ]})
      modm.warnUser(usertosend.id)
    }
  },
};