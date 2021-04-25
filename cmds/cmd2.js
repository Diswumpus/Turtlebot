module.exports = {
    name: 'cmd embed',
    description: 'A blanc cmd',
    execute(message, Member, args) {
        let whoisEmbed = new Discord.MessageEmbed()
        const emojiname = client.emojis.cache.get('emojiID')
            .setTitle(`Testing`)
            .setColor("AQUA")
            //        .setDescription(`${emojiname}`)
            .addField(`Is it working?", "${emojiname}`)
            .setFooter(`Turtlebot`, turtlebot.url)
        message.channel.send(whoisEmbed);
    },
};