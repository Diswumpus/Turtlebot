const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "announce",
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel> <msg>",
  execute: async (message, Member, args) => {
    const rChannel = message.mentions.channels.first()
    //let rChannel = message.guild.channels.cache.get(args[0]);
    if (!rChannel)
      return message.channel.send(
        `You did not specify your channel to send the announcement too!`
      );
    console.log(rChannel);
    let MSG = message.content
      .split(`announce ${rChannel.id} `)
      .join("");
    if (!MSG)
      return message.channel.send(`You did not specify your message to send!`);
    const _ = new MessageEmbed()
      .setTitle(`New announcement!`)
      .setDescription(`${MSG}`)
      .setColor("RANDOM");
    rChannel.send(_);
    message.delete();
  },
};