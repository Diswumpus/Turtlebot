module.exports.link = async (link, t) => {
    const Discord = require('discord.js');
    let view
    if(!t){
    view = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel(`Jump to message`)
            .setEmoji('862868020073857065')
            .setStyle('LINK')
            .setURL(link)
    );
    } else {
        view = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(t)
                .setEmoji('862868020073857065')
                .setStyle('LINK')
                .setURL(link)
        );
    }
    return view
}
module.exports.delete = async () => {
    const Discord = require('discord.js');
    const view = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel(`Delete`)
            .setCustomId('deleteme')
            .setEmoji(require('./emojis.json').trashid)
            .setStyle('DANGER')
    );
    return view
}
/*
const view = await require('../interactions').delete();
, components: [view]

label, type, id, emoji
*/
module.exports.button = async (label, type, id, emoji) => {
    const Discord = require('discord.js');
    const types = {"1": "PRIMARY", "2": "SECONDARY", "3": "SUCCESS", "4": "DANGER"};
    const button = new Discord.MessageButton()
    .setLabel(label)
    .setStyle(types[type])
    if(id) button.setCustomId(id)
    if(emoji) button.setEmoji(emoji)
    return button
}