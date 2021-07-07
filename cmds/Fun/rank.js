const Discord = require("discord.js")
const canvacord = require("canvacord");
const Levels = require("discord-xp");

module.exports = {
 name: "rank",
 category: 'Fun',
 description: "Shows your rank",
 execute: async (message, Member, args) => {
    //const userData = getDataSomehow();
    const target = message.mentions.users.first() || message.author;
    const avatarr = target.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })

        // const user = await Levels.fetch(target.id, message.guild.id);
        const user = await Levels.fetch(target.id, message.guild.id, true);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
    if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); 
    const rank = new canvacord.Rank()
        .setAvatar(avatarr)
        .setCurrentXP(user.xp)
        .setRequiredXP(neededXp)
        .setRank(user.position)
        .setLevel(user.level)
        .setStatus(`${target.presence.status}`)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(`${target.username}`)
        .setDiscriminator(`${target.discriminator}`);
    
    rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "card.png");
            message.channel.send({ content: `${require('../../emojis.json').check} ${target}'s Rank!`, files: [attachment] });
        });
 },
};