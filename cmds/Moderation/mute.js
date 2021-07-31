const Discord = require('discord.js');
const modm = require('../../models/Moderation/mod_manager');
const ms = require('ms');
const { mute } = require('../../brandArt.json');
const { MessageEmbed } = require('discord.js');
const emojis = require('../../emojis.json');

module.exports = {
  name: 'mute',
  permissions: 'MANAGE_MESSAGES',
  category: 'Moderation',
  description: 'Mutes a member!',
  usage: '<user> <time>',
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.User} Member 
     * @param {[String]} args 
     */
  async execute(message, Member, args) {
    return message.client.beta(message)
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!args[1]){
        return message.channel.send({ content: `${require('../../emojis.json').xmark} Wrong usage! \`${message.client.config.prefix}${this.name} ${this.usage}\``})
    } else if(user){
      if(user.user.bot) return message.channel.send({ content: `${emojis.xmark} You can\'t mute a bot!` })
      const muteTime = parseInt(ms(args[1]) + Date.now());
      const rawmuteTime = parseInt(ms(args[1]));
        modm.mute(user, rawmuteTime)
        const muteTimeleft = Math.round(new Date(muteTime).getTime()/1000);
        const membed = new MessageEmbed().setColor(message.client.confiig.color)
        .setDescription(`${user} has been muted for <t:${Math.round(muteTime/1000)}:R>`)
        .setThumbnail(mute)
        message.channel.send({ embeds: [membed]});
    }
  },
};