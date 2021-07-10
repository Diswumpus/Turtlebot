const Discord = require('discord.js');
const fetch = require('node-fetch');
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'magik',
    async execute(client, interaction) {
        try {
            const genembed = new Discord.MessageEmbed()
            .setTitle(`Generating...`)
            await interaction.reply({ embeds: [genembed] })
            let user = interaction.options?.find(c => c?.name === 'user')?.user.displayAvatarURL({format: 'png', size: 512}) || interaction.user.displayAvatarURL({format: 'png', size: 512});
            let numb = Math.ceil(Math.random() * 10)
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=magik&image=${user}&intensity=${numb}`
          ).then((res) => res.json());
        let whoisEmbed = new Discord.MessageEmbed()
            .setColor(client.confiig.color)
            .setImage(data.message)
            const view = await require('../interactions').delete();
            await wait(100);
            await interaction.editReply({ embeds: [whoisEmbed], components: [view] });
        } catch (err) {
        
        console.warn(`${err}, command name: magik`)
        //interaction.reply("```ERROR```")
       }
    },
};