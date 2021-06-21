const Discord = require('discord.js');
const config = require('../../config.json')
const conffig = require('../../config2.json')

module.exports = {
  name: 'help',
  category: 'Info',
  description: 'Server info',
  async execute(message, Member, args) {
    const owner = message.client.users.cache.get(config.ownerID)
    const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
    const nodejs = message.client.emojis.cache.find(em => em.name === "Nodejs");
    if (!args[0]) {
      const genEmber = (text) => {
        return new Discord.MessageEmbed()
          .setColor(message.client.confiig.color)
          .setTitle(`Here's a list of all my commands!`)
          .setURL(conffig.cmd)
          .setDescription('**This command is currently in beta**')
          .setThumbnail(message.client.user.displayAvatarURL())
          .addField('1️⃣ Config', 'Settings, invite and 2ms role')
          .addField('2️⃣ Dev', 'Don\' go here!')
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
      message.channel.send({ embeds: [genEmber(`Here's a list of my commands`)] }).then((editthis) => {
        editthis.react('1️⃣')
        editthis.react('2️⃣')
        editthis.react('3️⃣')
        editthis.react('4️⃣')
        editthis.react('5️⃣')
        editthis.react('6️⃣')
        editthis.react('7️⃣')
        message.client.on('messageReactionAdd', async (reaction, user) => {
          if (user.bot) {
            return
          }
          if (reaction.emoji.name === '1️⃣') {
            editthis.edit({ embeds: [genCategoryHelp('Config')]});
          }
          if (reaction.emoji.name === '2️⃣') {
            editthis.edit({ embeds: [genCategoryHelp(`Dev`)]});
          }
          if (reaction.emoji.name === '3️⃣') {
            editthis.edit({ embeds: [genCategoryHelp(`Fun`)] });
          }
          if (reaction.emoji.name === '4️⃣') {
            editthis.edit({ embeds: [genCategoryHelp(`Info`)]});
          }
          if (reaction.emoji.name === '5️⃣') {
            editthis.edit({ embeds: [genCategoryHelp(`Misc`)]});
          }
          if (reaction.emoji.name === '6️⃣') {
            editthis.edit({ embeds: [genCategoryHelp(`Moderation`)]});
          }
          if (reaction.emoji.name === '7️⃣') {
            editthis.edit({ embeds: [genCategoryHelp(`Reaction Roles`)]});
          }
          message.client.on('messageReactionRemove', async (reaction, user) => {
            if (user.bot) {
              return
            }
            if (reaction.emoji.name === '1️⃣') {
              editthis.edit({ embeds: [genEmber(`-`)]});
            }
            if (reaction.emoji.name === '2️⃣') {
              editthis.edit({ embeds: [genEmber(`-`)]});
            }
            if (reaction.emoji.name === '3️⃣') {
              editthis.edit({ embeds: [genEmber(`-`)]});
            }
            if (reaction.emoji.name === '4️⃣') {
              editthis.edit({ embeds: [genEmber(`-`)]});
            }
            if (reaction.emoji.name === '5️⃣') {
              editthis.edit({ embeds: [genEmber(`-`)]});
            }
            if (reaction.emoji.name === '6️⃣') {
              editthis.edit({ embeds: [genEmber(`-`)]});
            }
            if (reaction.emoji.name === '7️⃣') {
              editthis.edit({ embeds: [genEmber(`-`)]});
            }
          }
        );
  })
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
