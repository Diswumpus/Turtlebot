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