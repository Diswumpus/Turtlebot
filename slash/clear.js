const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    async execute(client, interaction) {
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
            let deletenum = interaction.options?.find(c => c?.name === 'amount')?.value;
            const embeedd = new Discord.MessageEmbed()
                .setTitle(`:wastebasket: Deleted ${deletenum} messages!`)
                .setColor(client.confiig.color)
            interaction.channel.bulkDelete(deletenum)
            await interaction.reply({ embeds: [embeedd] });
        }
    }
}