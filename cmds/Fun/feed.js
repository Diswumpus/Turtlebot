const Discord = require('discord.js');
const commandsss = require('../../models/commands')
const fetch = require('node-fetch');
const pets = require('../../models/cat')
async function convertt(term) {
	if(term === false){
        return 'Not hungry';
    } else if(term === true){
        return 'Hungry';
    } else {
        return 'null';
    }
};

module.exports = {
    name: 'pets-view',
    category: 'Fun',
    description: 'Feed your pet!',
    async execute(message, Member, args) {
        const res = await fetch('https://some-random-api.ml/animal/cat')
        const json = await res.json()
        let cmdss = await commandsss.findOne({
            user: message.author.id
        });
        let pettt = await pets.findOne({
            user: message.author.id
        });
        if(!pettt){
        pettt = new pets({
            user: message.author.id,
            url: json.image
        });
        await pettt.save().catch(e => console.log(e));
    }
    let newpettt = await pets.findOne({
        user: message.author.id
    });
        const hungry = await convertt(cmdss.hungry)
        const cembed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}'s pet!`)
        .addField(`Hungry:`, `${hungry}`)
        .addField(`Commands used:`, `${cmdss.uses}`)
        .setThumbnail(newpettt.url)
        .setColor(message.client.confiig.color)
        if(cmdss){
            message.channel.send({ embeds: [cembed] })
        }
            /*
        user: String,
    uses: Number,
    hungry: Boolean,
    lastfead: Number
    */
},
};