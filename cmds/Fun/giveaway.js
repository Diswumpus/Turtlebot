const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "giveaway",
  category: 'Fun',
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize>",
  category: "fun",
  aliases: ['g'],
  execute: async (message, Member, args) => {
    if (!args[0]) return message.channel.send(`You did not specify your time! ${opps}`);
    const opps = message.client.emojis.cache.find(em => em.name === "ablobglitch");
    const think = message.client.emojis.cache.find(em => em.name === "ablobthinkingeyes");
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `You did not use the correct formatting for the time! ${opps}`
      );
    if (isNaN(args[0][0])) return message.channel.send(`That is not a number! ${opps}`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `I could not find that channel in the guild! ${think}`
      );
    let prize = args.slice(2).join(" ");
    let time = args[0]
    const gift = message.client.emojis.cache.find(em => em.name === "atada");
    const party = message.client.emojis.cache.find(em => em.name === "ablobcolorshift");
    const gifts = message.client.emojis.cache.find(em => em.name === "blobgift1");
    if (!prize) return message.channel.send(`No prize specified!`);
    message.channel.send(`Giveaway successfully created in ${channel} for ${prize} made by ${message.author} ${gifts}`);
    let Embed = new MessageEmbed()
      .setTitle(`${prize}`)
      .setDescription(
        `${message.author} is hosting a giveaway for **${prize}!**`
      )
      .setFooter("React to join the giveaway")
      .setFooter(`Good luck`, gifts.url)
      .addField("Time left:", `${time}`)
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`AQUA`);
    let m = await channel.send(Embed);
    let react = gift; //"🎉"; //'836423414419161138';
    m.react(react);
    setTimeout(() => {
      if (m.reactions.cache.get(react.id).count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get(react).count}`);
        return message.channel.send(
          `Not enough people reacted for me to start draw a winner! ${opps}`
        );
      }
      let winner = m.reactions.cache
        .get(react.id)
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `${party} Congratulations ${winner}! You won **${prize}**! ${gifts}`
      );
    }, ms(args[0]));
  },
};