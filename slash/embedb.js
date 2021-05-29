const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: '-',
    async execute(client, interaction) {
        let channel = interaction.options[0].channel;
        let title = interaction.options[1].value;
        let description = interaction.options[2].value;
        let color = interaction.options[3].value ?? 'AQUA';
        let thumbnail = interaction.options[4].value;
        let author = interaction.options[5].value;
        const theembed = new Discord.MessageEmbed()
        .setTitle(title)
        .setAuthor(author)
        .setColor(color)
        .setThumbnail(thumbnail)
        .setDescription(description)
        const m = await channel.send(theembed);
        const sendembed = new Discord.MessageEmbed()
        .setTitle(`Sent in ${channel.name}`)
        .setDescription(`[View](${m.url})`)
        await interaction.reply(sendembed)
    }
}