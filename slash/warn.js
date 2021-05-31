const Discord = require('discord.js');

module.exports = {
  name: 'warn',
  async execute(client, interaction) {
    if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
      let usertosend = interaction.options[0].user;
      let reason = interaction.options.length > 1 ? interaction.options[1].value : 'None';
      await interaction.reply(
          new Discord.MessageEmbed()
          .setTitle(`${usertosend.tag} has been warned`)
          .addField(`Reason:`, `${reason}`)
          .setColor(client.confiig.color)
      );
      usertosend.send(
        new Discord.MessageEmbed()
        .setTitle(`You have been warned`)
        .addField(`Reason:`, `${reason}`)
        .setColor(client.confiig.color)
    )
    }
  },
};