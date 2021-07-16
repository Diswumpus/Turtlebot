const Discord = require('discord.js');
const dt = require('discord-turtle');
const emojis = require('../../emojis.json');

module.exports = {
    name: 'pages',
    description: 'DEV ONLY',
    async execute(message, Member, args) {
        const page_1 = new Discord.MessageEmbed()
        .setTitle('Page 1')
        const page_2 = new Discord.MessageEmbed()
        .setTitle('Page 2')
        const pages = new dt.pages({
            pages: [page_1, page_2],
            emoji: [emojis.leaveid, emojis.joinid, emojis.trash4id],
            message: message,
            style: 'SECONDARY'
        })
        pages.setColor(require('../../config2.json').color)
        pages.build();
    }
}