const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    async execute(client, interaction) {
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
            let deletenum = interaction.options?.find(c => c?.name === 'amount')?.value;
            const embeedd = new Discord.MessageEmbed()
                .setTitle(`${require('../emojis.json').check} Deleted ${deletenum} messages!`)
                .setColor(client.confiig.color)
            interaction.channel.bulkDelete(deletenum + 1)
            await interaction.defer();
            //await interaction.reply({ embeds: [embeedd] });
            setTimeout(async () => {
                await interaction.deleteReply();
            }, 200);
        }
    }
}