const Discord = require('discord.js');

module.exports = {
    name: 'user-info',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let userr = interaction.options[0].member;
        const embeedd = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTitle(`${userr}`)
        .setThumbnail(userr.user.displayAvatarURL())
        .setDescription(`User: ${userr}`)
        .addField(`User ID:`, `${userr.id}`)
        //.addField(`[Avatar link](${userr.user.displayAvatarURL()})`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}