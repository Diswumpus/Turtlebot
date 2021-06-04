const Discord = require('discord.js');
const uuid = require("uuid");
const kfsRoot = require("key-file-storage");
const kfs = kfsRoot.default('data/problemjs');

module.exports = {
    name: 'problem',
    category: 'Info',
    description: 'Gives info about server,avatar',
    usage: "<message> <title>",
    execute(message, Member, args) {
        const msguuid = uuid.v4();
        let msgData = kfs.msgData;
        if (!msgData) msgData = {};
        let msgg = args[1]
        let sometitle = args[0]
        if (message.author.bot) return;
        message.reply("Thank you for reporting the problem, I have sent it over to my Developers!").then((editthis) => {
            message.client.on('messageReactionAdd', async (reaction, user) => {
                if (user.bot) {
                    return
                }
                if (reaction.emoji.name === '✅') {
                    editthis.edit('Your problem has been solved!');
                }
                if (reaction.emoji.name === '❎') {
                    editthis.edit('Your problem has been rejected!');
                }
                if (reaction.emoji.name === '📩') {
                    editthis.edit('Your problem has been marked as spam!');
                }
            });
            const suggestion = new Discord.MessageEmbed()
                .setTitle(`${sometitle}`)
                .setAuthor(`Report from ${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL())
                .addField(`${msgg}`, `Users sent message`)
                .setFooter(`ID: ${msguuid} • User: ${message.author.tag}`)
                .setColor(message.client.confiig.color)
                .setTimestamp();
            msgData[msguuid] = message.author.id;
            kfs.msgData = msgData;
            const suggestionedit = new Discord.MessageEmbed()
                .setTitle(`${sometitle}`)
                .setAuthor(`Report from ${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL())
                .addField(`${msgg}`, `Users sent message`)
                .addField(`Suggestion was marked as spam`, `❌`)
                .setFooter(`ID: ${msguuid} • User: ${message.author.tag}`)
                .setColor(message.client.confiig.color)
                .setTimestamp()
            // this.client.channels.get('840789206976167966').send(suggestion)
            message.author.send(`Hey ${message.author.username}, this is where we will notify you for when we solve your problem!\nYour ID is: ${msguuid}`);
            const channel = message.client.channels.cache.get("840789206976167966");
            channel.send(suggestion).then((edittthis) => {
                edittthis.react('✅')
                edittthis.react('❎')
                edittthis.react('📩')
                message.client.on('messageReactionAdd', async (reaction, user) => {
                    if (user.bot) {
                        return
                    }
                    if (reaction.emoji.name === '📩') {
                        edittthis.edit(suggestionedit);
                    }
                })
            })
        });
    }
};