const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js');

module.exports = {
    name: 'help',
    async execute(client, interaction) {
        const owner = client.users.cache.get(require('../config.json').ownerID)
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
        const message = interaction;
        const turtlebot = client.emojis.cache.get(require('../emojis.json').tbid);
        const nodejs = client.emojis.cache.get('841008822482894879');
        const commandsss = client.confiig.cmd;
        const genEmber = (text) => {
            return new Discord.MessageEmbed()
                .setColor(client.confiig.color)
                .setTitle(`Here's a list of all my commands!`)
                .setURL(commandsss)
                .setDescription('**This command is currently in beta**')
                .setThumbnail(turtlebot.url)
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
                .setColor(client.confiig.color)
                .setTitle("I'm Turtlebot")
                .setDescription('Here\'s a list of all my commands:')
                .setThumbnail(turtlebot.url);
            const { commands } = client;
            const { config } = client;
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
        interaction.reply({ embeds: [genEmber(`Here's a list of my commands`)], components: [row, roww] }).then((editthis) => {
                    //Create collector
        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 150000 });
        let value;
        collector.on('collect', async i => {
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
            await interaction.editReply({ embeds: [genCategoryHelp('Config')], components: [row, roww] });
            reply('1');
          } else if(value === '2'){
            await interaction.editReply({ embeds: [genCategoryHelp('Dev')], components: [row, roww] });
            reply('2');
          } else if(value === '3'){
            await interaction.editReply({ embeds: [genCategoryHelp('Fun')], components: [row, roww] });
            reply('3');
          } else if(value === '4'){
            await interaction.editReply({ embeds: [genCategoryHelp('Info')], components: [row, roww] });
            reply('4');
          } else if(value === '5'){
            await interaction.editReply({ embeds: [genCategoryHelp('Misc')], components: [row, roww] });
            reply('5');
          } else if(value === '6'){
            await interaction.editReply({ embeds: [genCategoryHelp('Moderation')], components: [row, roww] });
            reply('6');
          } else if(value === '7'){
            await interaction.editReply({ embeds: [genCategoryHelp('Reaction Roles')], components: [row, roww]});
            reply('7');
          } else if(i?.customId === 'delete'){
            await interaction.deleteReply();
            return await i.reply({ content: `${require('../emojis.json').check} Deleted the help menu!`, ephemeral: true })
          }
         console.log(`Collected ${i.customId}`)
        });
        collector.on('end', async collected => {
            await interaction.editReply({ embeds: [genEmber(`Here's a list of my commands`)], content: 'This message is now inactive'})
          console.log(`Collected ${collected.size} items`)
        });
        })
    }
}