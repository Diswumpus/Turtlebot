const Discord = require('discord.js');

module.exports = {
    name: 'suggest',
    description: '-',
    async execute(client, interaction) {
        let msgg = interaction.options[0].value;
        const suggestion = new Discord.MessageEmbed()
        .setAuthor(`Suggestion from ${interaction.user.tag} | ${interaction.user.id}`, interaction.user.displayAvatarURL())
        .addField(`${msgg}`, `——————`)
        .setColor(client.confiig.color)
        .setTimestamp()
        // this.client.channels.get('840789206976167966').send(suggestion)
        const channel = client.channels.cache.get("840789206976167966");
        channel.send({ embeds: [suggestion] })
        await interaction.reply('Suggestion Sent ✅', { ephemeral: true });
    }
}