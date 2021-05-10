const Discord = require('discord.js');
const kfsRoot = require("key-file-storage");
const kfs = kfsRoot.default('data/problemjs');

module.exports = {
    name: 'find',
    category: 'Dev',
    description: '-',
    execute(message, Member, args) {
        if (message.author.id === '820465204411236362') {
            let idd = args[0]
            let msgData = kfs.msgData;
            let authorId = msgData[idd];
            message.channel.send(`<@${authorId}>`);
        }
    },
};