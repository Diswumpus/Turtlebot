const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'announce',
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel id> <msg> <title>",
  execute: async (message, Member, args) => {
    let rChannel = message.guild.channels.cache.get(args[0]);
    if (!rChannel)
      return message.channel.send(
        `You did not specify your channel to send the announcement too!`
      );
    //console.log(rChannel);
    let msg = args[1]
    let title = args[2]
    // let MSG = message.content
    //   .split(`announce ${rChannel.id} `)
    //   .join("");
     
    if (!msg)
      return message.channel.send(`You did not specify your message to send!`);
    const _ = new MessageEmbed()
      .setTitle(`${title}`)
      .setDescription(`${msg}`)
      .setColor("RANDOM");
    rChannel.send(_);
    message.delete();
  },
};