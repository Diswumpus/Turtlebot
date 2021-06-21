const Discord = require('discord.js');

module.exports = {
  name: 'warn',
  async execute(client, interaction) {
    if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
      let usertosend = interaction.options?.find(c => c?.name === 'user')?.user;
      let reason = interaction.options?.find(c => c?.name === 'reason')?.value || 'None';
      const embedy = new Discord.MessageEmbed()
      .setTitle(`${usertosend.tag} has been warned`)
      .addField(`Reason:`, `${reason}`)
      .setColor(client.confiig.color)
      await interaction.reply({ embeds: [embedy] });
      const embeds = new Discord.MessageEmbed()
      .setTitle(`You have been warned`)
      .addField(`Reason:`, `${reason}`)
      .setColor(client.confiig.color)
      usertosend.send({ embeds: [embeds] })
    }
  },
};