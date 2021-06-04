const Discord = require("discord.js")
const canvacord = require("canvacord");
const Levels = require("discord-xp");

module.exports = {
 name: "leaderboard",
 category: 'Fun',
 description: "Shows your rank",
 execute: async (message, Member, args) => {
    const client = message.client;
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
    
    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
    
    const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
    const leaderboardembed = new Discord.MessageEmbed()
    .setTitle('**Leaderboard**')
    .setColor(client.confiig.color)
    .setDescription(`${lb.join("\n\n")}`)
    .setFooter(`Turtlebot XP`)
    message.channel.send(leaderboardembed);
    //message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
 },
};