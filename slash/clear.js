const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    async execute(client, interaction) {
        let deletenum = interaction.options[0].value;
        const embeedd = new Discord.MessageEmbed()
            .setTitle(`:wastebasket: Deleted ${deletenum} messages!`)
        interaction.channel.bulkDelete(deletenum)
        await interaction.reply(embeedd);
    }
}