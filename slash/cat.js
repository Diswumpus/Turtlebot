const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    async execute(client, interaction) {
        await fetch('https://some-random-api.ml/animal/cat')
            .then(async res => {
                const json = await res.json()
                const embeedd = new Discord.MessageEmbed()
                    //.setTitle(`:cat: Meowww..`)
                    .setTitle(`:cat: Meowww..`)
                    .setURL(json.image)
                    .setImage(json.image)
                    .setDescription(json.fact)
                await interaction.reply(embeedd);
            })
    }
}