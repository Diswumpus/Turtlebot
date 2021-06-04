const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'reminder',
    description: '-',
    async execute(client, interaction) {
        const time = interaction.options[0].value;
        const reminder = interaction.options[1].value;
        const timer = client.emojis.cache.get('846868929065517066');
        const embedd = new Discord.MessageEmbed()
        .setTitle(`Reminder > ${reminder}`)
        .setAuthor(`Author > ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setFooter(`${time}`, timer.url)
        .setColor(client.confiig.color)
        .setTimestamp()  
        await interaction.reply(embedd);
        setTimeout(() => {
            const embeddd = new Discord.MessageEmbed()
            .setTitle(`Reminder > ${reminder}`)
            .setAuthor(`Author > ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setDescription(`Time's Up! ${timer}`)
            .setColor(client.confiig.color)
            .setTimestamp()
            interaction.channel.send(embeddd)
            interaction.user.send(embeddd)
        }, ms(time))
    }
}