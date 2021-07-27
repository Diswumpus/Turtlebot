const { Message, MessageEmbed, GuildMember, MessageActionRow, MessageButton } = require("discord.js");
const Discord = require('discord.js');
const dt = require('discord-turtle');
const ms = require("ms");
const emojis = require("../../emojis.json");
module.exports = {
  name: "giveaway",
  category: 'Fun',
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize> [description]",
  category: "fun",
  aliases: ['g'],
  /**
   * 
   * @param {Message} message 
   * @param {GuildMember} Member 
   * @param {Array} args 
   */
  async execute(message, Member, args){
    const length = ms(args[0]);
    const prize = args[2];
    const title = prize;
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    const endTime = Date.now() + length;
    let description = args[3];
    if(description) description = description + '\n\n'
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('ge')
      .setEmoji(require('../../emojis.json').tadaid)
      .setLabel(`Enter`)
      .setStyle('SECONDARY')
    )
      let timeLeft = new dt.timestamp()
      timeLeft.setStyle('R')
      timeLeft.setTime(endTime)
      timeLeft = timeLeft.toTimestamp();
      let uentered = 0;
    const gembed = new Discord.MessageEmbed()
    .setTitle(`${title}`)
    .setURL(message.client.site)
    .setDescription(`${description || ''}${emojis.timer} Ends ${timeLeft}\n${emojis.useradd} ${uentered} Users in the giveaway\n${emojis.pin} Hosted by: ${message.author}`)
    .setFooter(`1 Winner`, message.client.emojis.cache.get(emojis.tadaid).url)
    .setColor(message.client.color)
    .setTimestamp(Date.now() + ms(length))
    if(description) description = description.replace('\n\n', '')
    const m = await channel.send({ embeds: [gembed], components: [row] });
    const collector = m.createMessageComponentCollector({ message: m, time: length+1 });
    
    collector.on('collect', async i => {
      if(i.customId === 'ge'){
        uentered++
        m.edit({ embeds: [gembed.setDescription(`${description || ''}${emojis.timer} Ends ${timeLeft}\n${emojis.useradd} ${uentered} Users in the giveaway\n${emojis.pin} Hosted by: ${message.author}`)], components: [row] });
        i.reply({ content: `${emojis.check1} Successfully entered the Giveaway! ${emojis.tada}`, ephemeral: true })
      } else {
        i.reply({ content: `${emojis.xmark} Error!`, ephemeral: true });
      }
    });

    collector.on('end', async collected => {
      const tendTime = new dt.timestamp()
      tendTime.setStyle('R')
      const ended = tendTime.toTimestamp();
      const endembed = new MessageEmbed()
      .setTitle(`${title}`)
      .setURL(message.client.site)
      .setFooter(`1 Winner`, message.client.emojis.cache.get(emojis.tadaid).url)
      .setColor(message.client.color)
      .setTimestamp()
      if(description) { endembed.setDescription(`${description}\n\n${emojis.pin} Ended ${ended}`) } else {
        endembed.setDescription(`${emojis.pin} Ended ${ended}`)
      }
      row.components[0].setDisabled(true)
      m.edit({ embeds: [endembed], components: [row] });
      if(!collector.users || collector.users.size < 1){
        channel.send({ content: `${emojis.tada} - No one entered!`, components: [await require('../../interactions').link(m.url)] });
        return
      }
      const winner = collector.users.random();
      channel.send({ content: `${emojis.tada} - ${winner}`, components: [await require('../../interactions').link(m.url)] });
    })
  }
};