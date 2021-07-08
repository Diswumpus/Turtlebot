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
            label: 'Dev',
            description: 'Don\'t go here!',
            value: '2',
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
          .setTitle(`Here's a list of all my commands!`)
          .setURL(conffig.cmd)
          .setDescription('**This command is currently in beta**')
          .setThumbnail(message.client.user.displayAvatarURL())
          .addField('1️⃣ Config', 'Settings, invite and other')
          .addField('2️⃣ Dev', 'Don\'t go here!')
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
          .setTitle("I'm Turtlebot")
          .setURL(conffig.cmd)
          .setDescription('Here\'s a list of all my commands:')
          .setThumbnail(message.client.user.displayAvatarURL());
        const { commands } = message.client;
        const { config } = message.client;
        commands.forEach(cmd => {
          if (cmd.category === categoryName) helpEmbed.addField(`Name: ${cmd.name}`, `Description: ${cmd.description}`);
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
        collector.on('collect', i => {
          if(i.values){
          value = i.values[0];
          } else {
            value = null
        }
          async function reply(t) {
            const tt = {"1": "Config", "2": "Dev", "3": "Fun", "4": "Info", "5": "Misc", "6": "Moderation", "7": " Reaction Roles"}
            await i.reply({ content: `Changed Menu to ${tt[t]}`, ephemeral: true })
            return null
          }
          if(value === '1'){
            editthis.edit({ embeds: [genCategoryHelp('Config')], components: [row, roww] });
            reply('1');
          } else if(value === '2'){
            editthis.edit({ embeds: [genCategoryHelp('Dev')], components: [row, roww] });
            reply('2');
          } else if(value === '3'){
            editthis.edit({ embeds: [genCategoryHelp('Fun')], components: [row, roww] });
            reply('3');
          } else if(value === '4'){
            editthis.edit({ embeds: [genCategoryHelp('Info')], components: [row, roww] });
            reply('4');
          } else if(value === '5'){
            editthis.edit({ embeds: [genCategoryHelp('Misc')], components: [row, roww] });
            reply('5');
          } else if(value === '6'){
            editthis.edit({ embeds: [genCategoryHelp('Moderation')], components: [row, roww] });
            reply('6');
          } else if(value === '7'){
            editthis.edit({ embeds: [genCategoryHelp('Reaction Roles')], components: [row, roww]});
            reply('7');
          } else if(i?.customId === 'delete'){
            editthis.delete()
          }
         console.log(`Collected ${i.customId}`)
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
  helpp.addField(`Name: ${cmd.name}`, `Description: ${cmd.description}`)
  if (!cmd) {
    const notfound = new Discord.MessageEmbed()
    .setTitle(`Not found!`)
    message.channel.send({ embeds: [notfound] })
  }
  await message.channel.send({ embeds: [helpp] });
}
  }
}
