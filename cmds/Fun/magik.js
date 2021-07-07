const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'magik',
    category: 'Fun',
    description: 'Make a magik avatar!',
    async execute(message, Member, args) {
        try {
            const genembed = new Discord.MessageEmbed()
            .setTitle(`Generating...`)
            const m = await message.channel.send(genembed)
            let user = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) :message.author.displayAvatarURL({format: 'png', size: 512});
            let numb = Math.ceil(Math.random() * 10)
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=magik&image=${user}&intensity=${numb}`
          ).then((res) => res.json());
          message.delete({timeout: 500})
          //message.channel.send(new discord.MessageEmbed().setColor(client.color.blue).setImage(data.message))
        let whoisEmbed = new Discord.MessageEmbed()
            .setColor(message.client.confiig.color)
            .setImage(data.message)
            setTimeout(() => {
            m.edit(whoisEmbed)
            }, 500);
        } catch (err) {
        
        console.log(`${err}, command name: magik`)
        message.channel.send(`${require('../../emojis.json').x} Something went wrong with ${this.name}`)
       }
    },
};