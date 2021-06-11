const Discord = require("discord.js");
const emojii = require('../../models/emojis')
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "emojis",
  aliases: ['emoji'],
  description: "Check the emoji leaderboard",
  async execute(message, Member, args) {
    try {
    const docs = await emojii.find().limit(4).sort({ 'uses': -1 })
    const lea = await emojii.find().limit(4).sort({ 'uses': 1 })
    const webhook = await message.channel.createWebhook(`${message.client.user.username}`, {
      avatar: `${message.client.user.displayAvatarURL({ dynamic: true, size: 1024 })}`,
    })
    const lb = new Discord.MessageEmbed()
      .setTitle(`Emoji Stats`)
      .setColor(`BLUE`)
      .addField(`${docs.length} Top emojis`, `[- Top emojis:](${message.client.confiig.cmd})`)
    docs.forEach(c => {
      lb.addField(`${c.emoji}`, `${c.uses} Uses`);
    });
    lb.addFields({ name: `${lea.length} Least used emojis`, value: `[- Least used emojis:](${message.client.confiig.cmd})`})//`${lea.length} Emojis`, `[- Least used emojis:](${message.client.confiig.cmd})`
    lea.forEach(c => {
      lb.addField(`${c.emoji}`, `${c.uses} Uses`);
    });
    //message.channel.send(lb)
    await webhook.send({ embeds: [lb] });
    wait(1000)
    webhook.delete()
  } catch (error) {
    console.error(`Error trying to send:`, error);
}
  },
};