const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Create an embed!',
    async execute(client, interaction) {
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
        let channel = interaction.options?.find(c => c?.name === 'channel')?.channel || interaction.channel; //? interaction.options.length > 0 ? interaction.options[0].user : interaction.user;
        let title = interaction.options?.find(c => c?.name === 'title')?.value;
        let description = interaction.options?.find(c => c?.name === 'description')?.value;
        //Fix here >>
        let color = interaction.options?.find(c => c?.name === 'color')?.value || client.confiig.color; //interaction.options.length > 3 ? 
        let thumbnail = interaction.options?.find(c => c?.name === 'thumbnail')?.value
        let author = interaction.options?.find(c => c?.name === 'author')?.value;
        let field1 = interaction.options?.find(c => c?.name === 'field_1')?.value ?? 'Null';
        let field2 = interaction.options?.find(c => c?.name === 'field_2')?.value ?? 'Null'; //?? interaction.options[3].value
        if(interaction.options.size === 0 || interaction.options.size === 1){
            return await interaction.reply(
                new Discord.MessageEmbed()
                .setTitle(`You must have as least 1 option!`)
                .setDescription(`Options: ${interaction.options.length ?? '0'}`)
                .setColor('RED')
            )
        }
        //<<interaction.options?.find(c => c?.name === 'query').value
        const theembed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setThumbnail(thumbnail)
        .setDescription(description)
        .addField(field1, field2)
        //.addField()
        if(author){
            theembed.setAuthor(author)
        }
        const m = await channel.send(theembed);
        const sendembed = new Discord.MessageEmbed()
        .setTitle(`Sent in ${channel.name}`)
        .setDescription(`[View](${m.url})`)
        .setColor(`GREEN`)
        if(field1 && !field2){
            sendembed.addField('Error', 'You need to have 2 fields!')
        } else if(!field1 && field2){
            sendembed.addField('Error', 'You need to have 2 fields!')
        }
        await interaction.reply(sendembed)
    }
    }
}