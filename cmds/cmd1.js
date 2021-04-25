const Discord = require('discord.js');

module.exports = {
    name: 'bp',
    description: 'ccd',
    execute(message, Member, args) {
        const blobsc = message.client.emojis.cache.find(em => em.name === "blobscream");
        const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
        const botminus = message.client.emojis.cache.find(em => em.name === "aBot_minus");
        let tpEmbed = new Discord.MessageEmbed()
            .setTitle(`Tp!`)
            .setColor("AQUA")
            //        .setDescription(`${emojiname}`)
            .addField(`Tppppp", "${blobsc}`)
            .setFooter(`Turtlebot. This command shall never be used! ${botminus}`, turtlebot.url)
        message.channel.send(tpEmbed);
    },
}; 