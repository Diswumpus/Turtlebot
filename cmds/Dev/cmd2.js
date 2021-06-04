const Discord = require('discord.js');

module.exports = {
    name: 'Temp',
    description: 'A embed template',
    category: 'Dev',
    execute(message, Member, args) {
        const emojiname = message.client.emojis.cache.find(em => em.name === "emojiname");
        let tEmbed = new Discord.MessageEmbed()
            .setTitle(`This is a template`)
            .setColor(client.confiig.color)
            //        .setDescription(`${emojiname}`)
            .addField(`Template", "${emojiname}`)
            .setFooter(`Turtlebot`, turtlebot.url)
        message.channel.send(tEmbed);
    },
};