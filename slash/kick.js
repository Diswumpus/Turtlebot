const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            interaction.reply(`You don't have permissions`)
        }
        if (interaction.member.permissions.has('KICK_MEMBERS')) {
        const member = interaction.options[0].member;
        const reason = interaction.options[1].value;
        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`Kicked ${member.user.tag}`)
        .setColor(`RED`)
        .setDescription(`${member.user.tag} Can always come back!`)
        await interaction.reply(avatarembed);
        member.kick(`${reason}`);
        }
    }
}