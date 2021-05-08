const Discord = require('discord.js');

module.exports = {
  name: 'hel',
  category: 'Info',
  description: 'Server info',
  execute(message, Member, args) {
    const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
    const genEmber = (text) => {
      return new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTitle(text)
        .setDescription('**This command is currently in beta**')
        .setThumbnail(turtlebot.url)
        .addField('1️⃣ Fun')
        .addField('2️⃣ Moderation')
        .addField('3️⃣ MsgHere')
        .addField('If you see a problem notify my developers **Turtlepaw#5377**', true)
        .setTimestamp()
        .setFooter('Turtlebot Discord.Javascript', turtlebot.url);
    };
    message.channel.send(genEmber(`Here's a list of my commands`)).then((editthis) => {
      editthis.react('1️⃣')
      editthis.react('2️⃣')
      editthis.react('3️⃣')
      message.client.on('messageReactionAdd', async (reaction, user) => {
        if (user.bot) {
          return
        }
        console.log('Someone reacted! Good job 🎈')
        if (reaction.emoji.name === '1️⃣') {
          var helpEmbed = new Discord.MessageEmbed()
          .setColor('AQUA')
          .setTitle("heyo bud")
          .setDescription('Here\'s a list of all my commands:')
          .setThumbnail(turtlebot.url);
          const { commands } = message.client;
          const { config } = message.client;
          commands.forEach(cmd => {
            helpEmbed.addField(cmd.name, cmd.description);
          });
          //data.push(commands.map(command => command.name).join(', '));
          //data.push(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`);
  
          helpEmbed
          .addField('If you see a problem notify my developers **Turtlepaw#5377**', true)
          .setTimestamp()
          .setFooter('Turtlebot Discord.Javascript', turtlebot.url);
          editthis.edit(helpEmbed);
        }
        if (reaction.emoji.name === '2️⃣') {
          editthis.edit(genEmber(`ya works bud`));
        }
        if (reaction.emoji.name === '3️⃣') {
          editthis.edit(genEmber(`msg2u`));
        }
        message.client.on('messageReactionRemove', async (reaction, user) => {
          if (user.bot) {
            return
          }

          console.log('Someone reacted! Good job | Editing....')
          if (reaction.emoji.name === '1️⃣') {
            editthis.edit(genEmber(`heoy111`));
          }
          if (reaction.emoji.name === '2️⃣') {
            editthis.edit(genEmber(`u luck today 22222`));
          }
          if (reaction.emoji.name === '3️⃣') {
            editthis.edit(genEmber(`u luck today 33333`));
          }

        }
        );
      })
    })
  }
}
