const { Message, MessageEmbed, GuildMember, MessageActionRow, MessageButton } = require("discord.js");
const Discord = require('discord.js');
const dt = require('discord-turtle');
const ms = require("ms");
const emojis = require("../../emojis.json");
const { i, add } = require("mathjs");
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
    const emoji = emojis.tada
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    const endTime = Date.now() + length;
    let description = args[3];
    if(description) description = description + '\n\n'
    const row2 = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('ar')
      .setEmoji(require('../../emojis.json').flagid)
      .setLabel(`Add req.`)
      .setStyle('SECONDARY'),
      new MessageButton()
      .setCustomId('start')
      .setEmoji(require('../../emojis.json').joinid)
      .setLabel(`Start`)
      .setStyle('SECONDARY')
    )
    function bold(text) {
      return '**' + text + '**'
    }
    function time(time) {
      const moment = require('moment');
      var mm = moment.duration(time);
      return `${mm.hours()}h ${mm.minutes()}m ${mm.seconds()}s`;
    }
    const reqsg = new Array();
    let messagesr = 0;
    const sembed = new MessageEmbed()
    .setColor(message.client.color)
    .addField(`**Basic Settings**`, `${bold('Title:')} ${title}\n${bold('Description:')} ${description||'None'}\n**Length:** ${time(length)}\n**Emoji:** ${emoji}\n**Winners:** 1`)
    .addField('Requirements', '```No Requirements yet```')
    .setTitle(`Create a new giveaway!`)
    function redoEmbed() {
      sembed.fields.length = 0;
      sembed
      .addField(`**Basic Settings**`, `${bold('Title:')} ${title}\n${bold('Description:')} ${description||'None'}\n**Length:** ${time(length)}\n**Emoji:** ${emoji}\n**Winners:** 1`)
      .addField('Requirements', `${emojis.dot} Must send ${messagesr} messages`)
    }
    const m2 = await message.channel.send({ embeds: [sembed], components: [row2] });
    const collect = m2.createMessageComponentCollector({ filter: i=>i.user.id===message.author.id, time: 60000 })
    collect.on('collect', async somethinghere => {
      if(somethinghere.customId === 'ar'){
        const row3 = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('cancel')
          .setEmoji(require('../../emojis.json').flagid)
          .setLabel(`Cancel`)
          .setStyle('DANGER'),
          new MessageButton()
          .setCustomId('start')
          .setEmoji(require('../../emojis.json').joinid)
          .setLabel(`Start`)
          .setDisabled(true)
          .setStyle('SECONDARY')
        )

          const reqs = new MessageActionRow()
          .addComponents(
            new Discord.MessageSelectMenu()
          .setCustomId('reqs')
          .setPlaceholder('Select a requirement type')
          .addOptions([
            {
              emoji: emojis.messagesid,
              description: `Must of sent the specified amount of messages`,
              label: `Messages`,
              value: 'messages'
            }
          ])
          )
        const addreq = new MessageEmbed().setColor(message.client.color)
        .setDescription(`Choose a requirement type`)
        .setTitle(`Add new Requirement`)
        somethinghere.update({ embeds: [addreq], components: [row3, reqs]})
        m2.awaitMessageComponent({ filter: i=>i.user.id===message.author.id, time: 60000 })
        .then(async collecteda => {
          if(collecteda.customId === 'cancel'){
            collecteda.update({ embeds: [sembed], components: [row2] });
          } else if(collecteda.customId === 'reqs'){
            if(collecteda.values[0] === 'messages'){
              const newEmbed = new MessageEmbed().setColor(message.client.color)
              .setTitle(`Set requirement value`)
              .setDescription(`Set the value for the requirement (MESSAGES)\nPlease type the minimum amount of messages each entrant must have sent.`)
              reqsg.push('messages')
              collecteda.update({ embeds: [newEmbed], components: [row3] });
              m2.awaitMessageComponent({ filter: i=>i.user.id===message.author.id, time: 60000 })
              .then(async collecteda => {
                if(collecteda.customId === 'cancel'){
                  collecteda.update({ embeds: [sembed], components: [row2] });
                }
              })
              message.channel.awaitMessages({ filter: i=>i.author.id===message.author.id, time: 60000, max: 1, errors: ['time'] })//({ mfilter, max: 1, time: 900000, errors: ['time'] })
              .then(async messagec => {
                messagesr = Number(messagec.first().content)
                redoEmbed()
                m2.edit({ embeds: [sembed], components: [row2] })
              })
            }
          }
        })
      } else if(somethinghere.customId === 'start'){
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('ge')
          .setEmoji(require('../../emojis.json').tadaid)
          .setLabel(`Enter`)
          .setStyle('SECONDARY'),
          new MessageButton()
          .setCustomId('gr')
          .setEmoji(require('../../emojis.json').leaveid)
          .setLabel(`Leave Giveaway`)
          .setStyle('SECONDARY'),
          new MessageButton()
          .setCustomId('vu')
          .setEmoji(emojis.useraddid)
          .setLabel(`View users`)
          .setStyle('SECONDARY')
        )
          let timeLeft = new dt.timestamp()
          timeLeft.setStyle('R')
          timeLeft.setTime(endTime)
          timeLeft = timeLeft.toTimestamp();
          let uentered = 0;
          const usersinGiveaway = new Discord.Collection();
        const gembed = new Discord.MessageEmbed()
        .setTitle(`${title}`)
        .setURL(message.client.site)
        .setDescription(`${description || ''}${emojis.timer} Ends ${timeLeft}\n${emojis.useradd} ${uentered} Users in the giveaway\n${emojis.pin} Hosted by: ${message.author}`)
        .setFooter(`1 Winner`, message.client.emojis.cache.get(emojis.tadaid).url)
        .setColor(message.client.color)
        .setTimestamp(Date.now() + ms(length))
        if(reqsg.find(a => a === 'messages') === 'messages'){
          gembed
          .addField('Requirements', `${emojis.dot} Must send ${messagesr} messages`)
        }
        if(description) description = description.replace('\n\n', '')
        const m = await channel.send({ embeds: [gembed], components: [row] });
        const starte = new MessageEmbed().setColor(message.client.color)
        .setDescription(`[View Giveaway](${m.url})`)
        .setTitle('Giveaway Started!')
        .setURL(m.url)
        somethinghere.update({ embeds: [starte], components: [] });

        const collector = m.createMessageComponentCollector({ message: m, time: length+1 });
        const removedus = new Discord.Collection();
        collector.on('collect', async i => {
          if(i.customId === 'ge'){
            if(!!usersinGiveaway.find(e => e === i.user.id)){
              return i.reply({ content: `${emojis.xmark} You can't enter more then once!`, ephemeral: true });
            }
            if(reqsg.find(a => a === 'messages') === 'messages'){
              const messagesrr = await require('../../models/plugins/functions').getMessages(i.member);
              if(messagesrr?.MESSAGES < messagesr){
                let messagesLeft = messagesr
                if(messagesrr?.MESSAGES){
                  messagesLeft = messagesr-messagesrr.MESSAGES
                }
                return i.reply({ content: `${emojis.xmark} You need ${messagesLeft} more messages!`, ephemeral: true })
              }
            }
            usersinGiveaway.set(i.user.id, i.user.id)
            uentered++
            m.edit({ embeds: [gembed.setDescription(`${description || ''}${emojis.timer} Ends ${timeLeft}\n${emojis.useradd} ${uentered} Users in the giveaway\n${emojis.pin} Hosted by: ${message.author}`)], components: [row] });
            i.reply({ content: `${emojis.check1} Successfully entered the Giveaway! ${emojis.tada}`, ephemeral: true })
          } else if(i.customId === 'gr'){
            usersinGiveaway.delete(i.user.id)
            if(usersinGiveaway.size > 0){
              uentered = uentered-1
            }
            m.edit({ embeds: [gembed.setDescription(`${description || ''}${emojis.timer} Ends ${timeLeft}\n${emojis.useradd} ${uentered} Users in the giveaway\n${emojis.pin} Hosted by: ${message.author}`)], components: [row] });
            i.reply({ content: `${emojis.check1} Removed you from the giveaway! ${emojis.leave}`, ephemeral: true });
          } else if(i.customId === 'vu') {
            const users = usersinGiveaway;
            if(usersinGiveaway.size < 1) return i.reply({ content: `There's no one in the Giveaway! ${emojis.xmark}`, ephemeral: true })
            i.reply({ content: `${users.map(u => `└── ${message.guild.members.cache.get(u).user}`).join("\n")}`, ephemeral: true });
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
          if(reqsg.find(e => e === 'messages') === 'messages'){
            endembed
            .addField('Requirements', `${emojis.dot} Must send ${messagesr} messages`)
          }
          row.components[0].setDisabled(true)
          row.components[1].setDisabled(true)
          row.components[2].setDisabled(true)
          m.edit({ embeds: [endembed], components: [row] });
          if(usersinGiveaway.size < 1){
            channel.send({ content: `${emojis.tada} - No one entered!`, components: [await require('../../interactions').link(m.url)] });
            return
          }
          const winner = message.guild.members.cache.get(usersinGiveaway.random()).user;
          channel.send({ content: `${emojis.tada} - ${winner}`, components: [await require('../../interactions').link(m.url)] });
        })
      }
    })
  }
};