const Discord = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'btns',
    description: 'A embed template',
    category: 'Dev',
    async execute(message, Member, args) {
        const emojiii = message.client.emojis.cache.get(`849069683046613012`);
    let btn = new Discord.MessageButton()
      .setStyle('blurple')
      .setLabel(`Buttons!! 🎉`)
      .setID('stupiddm');
      const bt = new Discord.MessageEmbed()
      .setTitle(`Buttons!! 🎉`)
      .setColor(message.client.confiig.color)
    let msg = await message.channel.send({
      button: btn,
      embed: bt
    });
    message.client.on('clickButton', async (button) => {
        //await button.think();
        const btnreply = new Discord.MessageEmbed()
        .setTitle(`Buttons!! 🎉`)
        .setColor(message.client.confiig.color)
        //await button.reply.send('Embed!', { embed: btnreply, ephemeral: false })
        await button.reply.send(' ', { embed: btnreply })
        //button.clicker.user.send(`Hello!`)
        await wait(10000);
        button.reply.delete()
    });
  }
}