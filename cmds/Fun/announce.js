const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "announce",
  category: 'Fun',
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel> <msg>",
  execute: async (message, Member, args) => {
    const announceemoji = message.client.emojis.cache.get('847574692390633523');
    const rChannel = message.mentions.channels.first()
    //let rChannel = message.guild.channels.cache.get(args[0]);
    if (!rChannel)
      return message.channel.send(
        `You did not specify your channel to send the announcement too!`
      );
    let MSG = args[1]
    if (!MSG)
      return message.channel.send(`You did not specify your message to send!`);
    const _ = new MessageEmbed()
      .setTitle(`Announcement! ${announceemoji}`)
      .setDescription(`${MSG}`)
      .setColor("AQUA");
    rChannel.send(_);
    message.delete();
  },
};