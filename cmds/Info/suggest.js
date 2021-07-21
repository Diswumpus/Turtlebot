const Discord = require('discord.js');
const { v4: uuidv4 } = require("uuid");
const { button } = require('../../interactions');
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'sug',
    category: 'Info',
    description: 'Sends a suggestion to my developer',
    async execute(message, Member, args) {
        const channel = message.client.channels.cache.get("840789206976167966");
        setTimeout(async () => {
            const suggestion = new Discord.MessageEmbed()
            .setTitle(`Suggestion #${channel.messages.cache.size}`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`${args[0]}`)
            .setColor(message.client.confiig.color)
            .setFooter('Turtlebot suggestions', message.client.emojis.cache.get(require('../../emojis.json').tbid).url)
            .setTimestamp()
            const m = await channel.send({ embeds: [suggestion] }).catch(( )=>{
                return message.reply({ content: `${require('../../emojis.json').x} Failed to send the message!` })
            });
            const buttons = await require('../../interactions').link(m.url)
            message.reply({ content: `${require('../../emojis.json').check} Sent!`, components: [buttons]})
        }, 3000);
    },
};