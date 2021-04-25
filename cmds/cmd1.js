module.exports = {
    name: 'tp',
    description: 'A blanc cmd',
    execute(message, Member, args) {
        let whoisEmbed = new Discord.MessageEmbed()
        const tp = client.emojis.cache.get('835906388776583248')
            .setTitle(`Tp!!`)
            .setColor("AQUA")
            //        .setDescription(`${emojiname}`)
            .addField(`Tppppppp!", "${tp}`)
            .setFooter(`Turtlebot`, turtlebot.url)
        message.channel.send(whoisEmbed);
    },
};

    