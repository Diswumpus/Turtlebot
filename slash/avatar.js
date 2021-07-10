const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    async execute(client, interaction) {
        const member = interaction.options?.find(c => c?.name === 'user')?.user || interaction.user;
        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`Avatar for ${member.tag}`)
        .addField(`Link as:`, `[png](${member.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}) | [jpg](${member.displayAvatarURL({ dynamic: true, format: 'jpg', size: 1024 })}) | [webp](${member.displayAvatarURL({ dynamic: true, format: 'webp', size: 1024 })})`)
        .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor(client.confiig.color)
        const view = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(`PNG`)
                .setEmoji('863207249508696064')
                .setStyle('LINK')
                .setURL(member.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })),
                new Discord.MessageButton()
                .setLabel(`JPG`)
                .setEmoji('863207249508696064')
                .setStyle('LINK')
                .setURL(member.displayAvatarURL({ dynamic: true, format: 'jpg', size: 1024 })),
                new Discord.MessageButton()
                .setLabel(`WEBP`)
                .setEmoji('863207249508696064')
                .setStyle('LINK')
                .setURL(member.displayAvatarURL({ dynamic: true, format: 'webp', size: 1024 }))
        );
        await interaction.reply({ embeds: [avatarembed], components: [view] });
    }
}