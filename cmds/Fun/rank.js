const Discord = require("discord.js")
const canvacord = require("canvacord");
const Levels = require("discord-xp");
const levelsc = require('../../models/plugins/rank-card');
const levelfn = require('../../models/plugins/functions');

module.exports = {
 name: "rank",
 category: 'Fun',
 description: "Shows your rank",
 execute: async (message, Member, args) => {
    //const userData = getDataSomehow();
    const target = message.mentions.users.first() || message.author;
    const avatarr = target.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })
        message.channel.startTyping();
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
        .setStatus('online')
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(`${target.username}`)
        .setDiscriminator(`${target.discriminator}`);
        const RANK_CARD = await levelfn.RANK_FIND(message.guild.id);
        if(RANK_CARD.found === true){
            if(!RANK_CARD.res.URL.endsWith('.png')){
                RANK_CARD.res.URL = RANK_CARD.res.URL
                .replace('.webp', '.png')
                .replace('.jpg', '.png')
                .replace('.jpeg', '.png')
            }
            rank.setBackground('IMAGE', RANK_CARD.res.URL)
        } else {
            rank.setBackground('COLOR', '#292B2E')
            rank.setOverlay('#292B2E')
        }
    
    rank.build()
        .then(data => {
            message.channel.stopTyping();
            const attachment = new Discord.MessageAttachment(data, "card.png");
            message.channel.send({ content: `${require('../../emojis.json').check} ${target}'s Rank!`, files: [attachment] });
        });
 },
};