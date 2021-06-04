const Discord = require('discord.js');

module.exports = {
    name: 'test',
    category: 'Dev',
    description: 'Test',
    execute(message, Member, args) {
        let whoisEmbed = new Discord.MessageEmbed()
            .setTitle(`Testing`)
            .setColor(client.confiig.color)
            //        .setDescription(`<:Myemoji:829858304297271306>`)
            .addField("Is it working?", "<:Myemoji:829858304297271306>")
            .setFooter("Turtlebot :)")
        message.channel.send(whoisEmbed);
    },
};
