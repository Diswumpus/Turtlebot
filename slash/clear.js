const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    async execute(client, interaction) {
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
        }
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
            let deletenum = interaction.options[0].value;
            const embeedd = new Discord.MessageEmbed()
                .setTitle(`:wastebasket: Deleted ${deletenum} messages!`)
                .setColor(client.confiig.color)
            interaction.channel.bulkDelete(deletenum)
            await interaction.reply(embeedd);
        }
    }
}