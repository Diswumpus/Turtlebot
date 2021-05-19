const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    async execute(client, interaction) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        const embeedd = new Discord.MessageEmbed()
        .setTitle(`:cat: Meowww..`)
        .setImage(file)
        await interaction.reply(embeedd);
    }
}