const Discord = require('discord.js');

module.exports = {
    name: 'sg',
    category: 'Info',
    description: 'Sends a suggestion to my developer',
    execute(message, Member, args) {
        let msgg = args[1]
        let sometitle = args[0]
        if (message.author.bot) return;
        message.reply("Thank you for your suggestion, I have sent it over to my Developers!")
        const suggestion = new Discord.MessageEmbed()
        .setTitle(`${sometitle}`)
        .setAuthor(`Suggestion from ${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL)
        .addField(`${msgg}`)
        .setColor("AQUA")
        .setTimestamp()
        // this.client.channels.get('840789206976167966').send(suggestion)
        const channel = message.client.channels.cache.get("840789206976167966");
        channel.send(suggestion)
    },
};