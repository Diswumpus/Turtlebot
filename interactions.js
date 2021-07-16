const Discord = require('discord.js');

/**
 * 
 * @param {String} [link] The button link
 * @param {String} [t] The button label
 * @returns Discord.MessageActionRow
 */
module.exports.link = async (link, t) => {
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
/**
 * @returns Discord.MessageActionRow
 */
module.exports.delete = async () => {
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
/**
 * 
 * @param {String} label The button label
 * @param {Discord.MessageButtonStyle} type The button style 
 * @param {String} id The buttons customId
 * @param {String} emoji The button emojis. Must be a emoji ID
 * @returns Discord.MessageButton
 */
module.exports.button = async (label, type, id, emoji) => {
    const types = {"1": "PRIMARY", "2": "SECONDARY", "3": "SUCCESS", "4": "DANGER"};
    const button = new Discord.MessageButton()
    .setLabel(label)
    .setStyle(types[type])
    if(id) button.setCustomId(id)
    if(emoji) button.setEmoji(emoji)
    return button
}
/**
 * 
 * @param {Discord.Guild} [guild] Guild
 * @returns Bot Invite
 */
module.exports.invite = async (guild) => {
    const client = require('./index').client;
    let inv;
    if(!guild){
        inv = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=4228381815`
    } else {
        inv = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=4228381815&guild_id=${guild.id}&disable_guild_select=true`
    }
    return inv
}