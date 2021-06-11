const Discord = require("discord.js");
const emojii = require('../../models/emojis')
module.exports = {
 name: "emojis",
 aliases: ['emoji'],
 description: "Check the emoji leaderboard",
 async execute(message, Member, args) {
    const docs = await emojii.find();
    const lb = new Discord.MessageEmbed()
    .setTitle(`Top emojis:`)
   .setColor(`BLUE`)
   docs.forEach(c => {
    lb.addField(c.emoji, `${c.uses} Uses`);
});
   message.channel.send(lb)
 },
};