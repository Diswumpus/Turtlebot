const Discord = require('discord.js');
const fetch = require('node-fetch');
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'magik',
    async execute(client, interaction) {
        try {
            const genembed = new Discord.MessageEmbed()
            .setTitle(`Generating...`)
            await interaction.reply(genembed)
            let user = interaction.options.length ? interaction.options[0].user.displayAvatarURL({format: 'png', size: 512}) :interaction.user.displayAvatarURL({format: 'png', size: 512});
            let numb = Math.ceil(Math.random() * 10)
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=magik&image=${user}&intensity=${numb}`
          ).then((res) => res.json());
        let whoisEmbed = new Discord.MessageEmbed()
            .setColor(client.confiig.color)
            .setImage(data.message)
            await wait(100);
            await interaction.editReply(whoisEmbed);
        } catch (err) {
        
        console.log(`${err}, command name: magik`)
        //interaction.reply("```ERROR```")
       }
    },
};