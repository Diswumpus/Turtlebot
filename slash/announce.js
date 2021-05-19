const Discord = require('discord.js');

module.exports = {
    name: 'announce',
    async execute(client, interaction) {
        const errorr = new Discord.MessageEmbed()
        .setTitle(`That's a 404`)
        .setColor(`YELLOW`)
        .setDescription(`This may be because this is a beta command`)
        .setImage(`https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kow11oq1p9a.png`)
        await interaction.reply(errorr);
    }
}