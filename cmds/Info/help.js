const Discord = require('discord.js');
const config = require('../../config.json')
const conffig = require('../../config2.json')
const { MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Info',
  description: 'Server info',
  async execute(message, Member, args) {
    const owner = message.client.users.cache.get(config.ownerID)
    const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
    const nodejs = message.client.emojis.cache.find(em => em.name === "Nodejs");
    if (!args[0]) {
      const row = new MessageActionRow()
			.addComponents(
        new MessageSelectMenu()
        .setCustomId('help_options')
        .setPlaceholder('Select a category!')
        .addOptions([
          {
            label: 'Config',
            description: 'Settings, invite and other',
            value: '1',
          },
          {
            label: 'Fun',
            description: 'Snipe, magik and all that',
            value: '3',
          },
          {
            label: 'Info',
            description: 'Help, ping info',
            value: '4',
          },
          {
            label: 'Misc',
            description: 'All the others',
            value: '5',
          },
          {
            label: 'Moderation',
            description: 'For server staff! Like ban and kick',
            value: '6',
          },
          {
            label: 'Reaction Roles',
            description: 'Reaction Roles!',
            value: '7',
          },
        ]),
			);
      const roww = new MessageActionRow()
			.addComponents(
        new MessageButton()
        .setCustomId('delete')
        .setLabel('Delete')
        .setStyle('DANGER')
			);

      
      const genEmber = (text) => {
        return new Discord.MessageEmbed()
          .setColor(message.client.confiig.color)
          .setAuthor(`${message.client.user.username}'s Commands!`, message.client.user.displayAvatarURL(), conffig.cmd)
          .setThumbnail(message.client.user.displayAvatarURL())
          .addField('1️⃣ Config', 'Settings, invite and other')
          .addField('3️⃣ Fun', 'Snipe, magik and all that')
          .addField('4️⃣ Info', 'Help, ping info')
          .addField('5️⃣ Misc', 'All the others')
          .addField('6️⃣ Moderation', 'For mods! Like ban and kick')
          .addField('7️⃣ Reaction Roles', 'Reaction Roles!')
          .addField(`If you see a problem notify my developers ${owner.tag}`, 'You can use the ,problem command to submit an issue')
          .setTimestamp()
          .setFooter('Turtlebot Discord.Javascript', nodejs.url);
      };
      const genCategoryHelp = (categoryName) => {
        var helpEmbed = new Discord.MessageEmbed()
          .setColor(message.client.confiig.color)
          .setAuthor(`${message.client.user.username}'s Commands!`, message.client.user.displayAvatarURL(), conffig.cmd)
          .setDescription(`Category: **${categoryName}**`)
          .setURL(conffig.cmd)
          .setThumbnail(message.client.user.displayAvatarURL());
        const { commands } = message.client;
        const { config } = message.client;
        commands.forEach(cmd => {
          if (cmd.category === categoryName){
            if(cmd.hidden === false || cmd.hidden === null || cmd.hidden === undefined){
            helpEmbed.addField(`Name: ${cmd.name}`, `Description: ${cmd.description}`)
            }
          };
        });
        //data.push(commands.map(command => command.name).join(', '));
        //data.push(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`);

        helpEmbed
          .addField('If you see a problem notify my developers!', `${owner.tag}`)
          .setTimestamp()
          .setFooter('Turtlebot Discord.Javascript', nodejs.url);
        return helpEmbed;
      }
      message.channel.send({ embeds: [genEmber(`Here's a list of my commands`)], components: [row, roww] }).then((editthis) => {
        //Create collector
        const filter = i => i.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ filter, time: 150000 });
        let value;
        collector.on('collect', async i => {
          if(i.values){
          value = i.values[0];
          } else {
            value = null
        }
        if(i.values){
          value = i.values[0];
          } else {
              value = null
          }
          async function reply(t) {
            const tt = {"1": genCategoryHelp('Config'), "2": genCategoryHelp('Dev'), "3": genCategoryHelp('Fun'), "4": genCategoryHelp('Info'), "5": genCategoryHelp('Misc'), "6": genCategoryHelp('Moderation'), "7": genCategoryHelp('Reaction Roles')}
            await i.update({ embeds: [tt[t]], ephemeral: false })
            return null
          }
          if(value === '1'){
            reply('1');
          } else if(value === '2'){
            reply('2');
          } else if(value === '3'){
            reply('3');
          } else if(value === '4'){
            reply('4');
          } else if(value === '5'){
            reply('5');
          } else if(value === '6'){
            reply('6');
          } else if(value === '7'){ 
            reply('7');
          } else if(i?.customId === 'delete'){
            await interaction.deleteReply();
            return await i.reply({ content: `${require('../emojis.json').check} Deleted the help menu!`, ephemeral: true })
          }
        });
        collector.on('end', collected => {
          editthis.edit({ embeds: [genEmber(`Here's a list of my commands`)], content: 'This message is now inactive'})
          console.log(`Collected ${collected.size} items`)
        });
})
} else if (args[0]) {
  const helpp = new Discord.MessageEmbed()
    .setFooter(`${message.client.user.username}`, message.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setColor('BLUE')
  const { commands } = message.client;
  const cmd = commands.find(c => c.name === args[0])
  if (!cmd) {
    const notfound = new Discord.MessageEmbed()
    .setTitle(`Not found!`)
    .setColor('RED')
    return message.channel.send({ embeds: [notfound] })
  }
  helpp.addField(`Name: ${cmd.name}`, `Description: ${cmd.description}`)
  await message.channel.send({ embeds: [helpp] });
}
  }
}
