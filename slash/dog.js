const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    async execute(client, interaction) {
        await fetch('https://some-random-api.ml/animal/dog')
            .then(async res => {
                const json = await res.json()
                const embeedd = new Discord.MessageEmbed()
                    //.setTitle(`:dog: Woof!`)
                    .setTitle(`:dog: Woof!`)
                    .setURL(json.image)
                    .setImage(json.image)
                    .setDescription(json.fact)
                await interaction.reply({ embeds: [embeedd] });
            });
    }
}