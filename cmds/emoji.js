const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "emoji",
  description: "View all emojis in the guild",
  category: "utility",
  execute: async (message, Member, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return message.guild.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(
        `Animated **${Animated}**:\n${EmojisAnimated}\n\nStandard **${EmojiCount}**:\n${Emojis}\n\nOver all emojis **${OverallEmojis}**`
      )
      .setColor(`AQUA`);
    message.channel.send(Embed);
  },
};