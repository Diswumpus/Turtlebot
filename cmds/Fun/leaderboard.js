const Discord = require("discord.js")
const canvacord = require("canvacord");
const Levels = require("discord-xp");
const Canvas = require('canvas');

module.exports = {
   name: "leaderboard",
   aliases: ['lb'],
   category: 'Fun',
   description: "Shows your rank",
   execute: async (message, Member, args) => {
      const client = message.client;
      const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

      if (rawLeaderboard.length < 1) return reply(`${require('../../emojis.json').x} Nobody's in leaderboard yet`);
      const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

      const leaderboardembed = new Discord.MessageEmbed()
         .setTitle(`${require('../../emojis.json').pin} **Leaderboard**`)
         .setColor(message.client.confiig.color)
         const users = new Array();
         for(const user of leaderboard){
            if(!users.includes(user.userID)){
            users.push(user.userID)
            leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}`); // We map the outputs.
            leaderboardembed.addField(`${user.position} ${user.username}#${user.discriminator}`, `Level: **${user.level}**`)
            }
         }
      message.channel.send({ embeds: [leaderboardembed] });
   },
};