const Discord = require('discord.js');
const { v4: uuidv4 } = require("uuid");

module.exports = {
    name: 'solve',
    category: 'Info',
    description: 'Solves the problem sent to my developers',
    execute(message, Member, args) {
        let uuidIDMSG = args[0]
        if (message.author.bot) return;
        const suggestion = new Discord.MessageEmbed()
        .setTitle(`Solved Problem! ✅`)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .addField(`Case ${uuidIDMSG} has been solved`)
        .setFooter(`,problem`, `,solve`)
        .setColor("AQUA")
        .setTimestamp()
        // this.client.channels.get('840789206976167966').send(suggestion)
        const channel = message.client.channels.cache.get("840789206976167966");
        channel.send(suggestion)
        message.channel.send(suggestion)
        uuidValidate(`${uuidIDMSG}`);
    },
};