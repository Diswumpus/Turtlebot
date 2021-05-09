module.exports = {
    name: 'problem',
    category: 'Info',
    description: 'Gives info about server,avatar',
    execute(message, Member, args) {
        let msgg = args[1]
        let sometitle = args[0]
        if (message.author.bot) return;
        message.reply("Thank you for reporting the problem, I have sent it over to my Developers!")
        const suggestion = new Discord.MessageEmbed()
        .setTitle(`${sometitle}`)
        .setAuthor(`Report from ${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL)
        .addField(`${msgg}`)
        .setColor("AQUA")
        .setTimestamp()
        // this.client.channels.get('840789206976167966').send(suggestion)
        const channel = message.client.channels.cache.get("840789206976167966");
        const channeli = message.client.channels.cache.get("841012044341444619");
        channel.send(suggestion)
        channeli.send(suggestion)
    },
};