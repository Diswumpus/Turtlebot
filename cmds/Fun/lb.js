const Discord = require("discord.js")
const canvacord = require("canvacord");
const Levels = require("discord-xp");

module.exports = {
 name: "lb",
 category: 'Fun',
 description: "Shows your rank",
 execute: async (message, Member, args) => {
    const client = message.client;
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1) return reply(`${require('../../emojis.json').x} Nobody's in leaderboard yet`);
    
    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
    
    const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
    const leaderboardembed = new Discord.MessageEmbed()
    .setTitle(`${require('../../emojis.json').check} **Leaderboard**`)
    .setColor(message.client.confiig.color)
    .setDescription(`${lb.join("\n\n")}`)
    message.channel.send({ embeds: [leaderboardembed] });
 },
};