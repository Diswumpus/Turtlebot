const Discord = require('discord.js');

module.exports = {
    name: 'guilds',
    async execute(client, interaction) {
        const guilds = client.guilds.cache.map(g=>g.name).join('\n• ')
        const guildsembed = new Discord.MessageEmbed()
        .setTitle(`These are all the guilds!`)
        .addField(`• ${guilds}`)
        await interaction.reply(guildsembed);
    }
}