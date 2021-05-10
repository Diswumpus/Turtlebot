const Discord = require('discord.js');
const { v4: uuidv4 } = require("uuid");

module.exports = {
    name: 'sg',
    category: 'Info',
    description: 'Sends a suggestion to my developer',
    execute(message, Member, args) {
        const uniqueId = uuidv4();
        let msgg = args[1]
        let sometitle = args[0]
        if (message.author.bot) return;
        const suggestionsent = new Discord.MessageEmbed()
        .setTitle(`This is what your sending`)
        .addField(`${sometitle}`, `Title`)
        .setAuthor(`User: ${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL())
        .addField(`${msgg}`, `Message`)
        .setFooter(`ID: ${uniqueId}`)
        .setColor("AQUA")
        .setTimestamp()
        message.reply(suggestionsent)
        const suggestion = new Discord.MessageEmbed()
        .setTitle(`${sometitle}`)
        .setAuthor(`Suggestion from ${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL())
        .addField(`${msgg}`)
        .setFooter(uniqueId)
        .setColor("AQUA")
        .setTimestamp()
        // this.client.channels.get('840789206976167966').send(suggestion)
        const channel = message.client.channels.cache.get("840789206976167966");
        channel.send(suggestion)
    },
};