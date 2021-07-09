const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'reminder',
    description: '-',
    async execute(client, interaction) {
        const time = interaction.options?.find(c => c?.name === 'time')?.value;
        const reminder = interaction.options?.find(c => c?.name === 'reminder')?.value;
        const timer = client.emojis.cache.get('846868929065517066');
        const embedd = new Discord.MessageEmbed()
        .setTitle(`Reminder > ${reminder}`)
        .setAuthor(`Author > ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setFooter(`${time}`, timer.url)
        .setColor(client.confiig.color)
        .setTimestamp()  
        const m = await interaction.reply({ embeds: [embeddd] });
        setTimeout(async () => {
            const embeddd = new Discord.MessageEmbed()
            .setTitle(`Reminder > ${reminder}`)
            .setAuthor(`Author > ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setDescription(`Time's Up! ${timer}`)
            .setColor(client.confiig.color)
            .setTimestamp()
            interaction.channel.send({ embeds: [embeddd] })
            const view = await require('../interactions').link(m.url)
            interaction.user.send({ embeds: [embeddd], components: [view] })
        }, ms(time))
    }
}