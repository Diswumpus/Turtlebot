const Discord = require('discord.js');

module.exports = {
    name: 'announce',
    async execute(client, interaction) {
        const errorr = new Discord.MessageEmbed()
        .setTitle(`?`)
        .setColor(`YELLOW`)
        .setDescription(`Why don't you try the \`/embed\` command?`)
        const view = await require('../interactions').delete();
        await interaction.reply({ embeds: [errorr], components: [view] });
    }
}