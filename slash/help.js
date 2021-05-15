const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: '-',
    async execute(client, interaction) {
        interaction.reply('✅', { ephemeral: true })
        const message = interaction
        const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
        const nodejs = message.client.emojis.cache.find(em => em.name === "Nodejs");
        const genEmber = (text) => {
            return new Discord.MessageEmbed()
                .setColor('AQUA')
                .setTitle(`Here's a list of all my commands!`)
                .setDescription('**This command is currently in beta**')
                .setThumbnail(turtlebot.url)
                .addField('1️⃣ Config')
                .addField('2️⃣ Dev')
                .addField('3️⃣ Fun')
                .addField('4️⃣ Info')
                .addField('5️⃣ Misc')
                .addField('6️⃣ Moderation')
                .addField('7️⃣ Reaction Roles')
                .addField('If you see a problem notify my developers **Turtlepaw#5377**', 'You can use the ,problem command to submit an issue')
                .setTimestamp()
                .setFooter('Turtlebot Discord.Javascript', nodejs.url);
        };
        const genCategoryHelp = (categoryName) => {
            var helpEmbed = new Discord.MessageEmbed()
                .setColor('AQUA')
                .setTitle("I'm Turtlebot")
                .setDescription('Here\'s a list of all my commands:')
                .setThumbnail(turtlebot.url);
            const { commands } = message.client;
            const { config } = message.client;
            commands.forEach(cmd => {
                if (cmd.category === categoryName) helpEmbed.addField(cmd.name, cmd.description);
            });
            //data.push(commands.map(command => command.name).join(', '));
            //data.push(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`);

            helpEmbed
                .addField('If you see a problem notify my developers **Turtlepaw#5377**')
                .setTimestamp()
                .setFooter('Turtlebot Discord.Javascript', nodejs.url);
            return helpEmbed;
        }
        message.channel.send(genEmber(`Here's a list of my commands`)).then((editthis) => {
            editthis.react('1️⃣')
            editthis.react('2️⃣')
            editthis.react('3️⃣')
            editthis.react('4️⃣')
            editthis.react('5️⃣')
            editthis.react('6️⃣')
            editthis.react('7️⃣')
            message.client.on('messageReactionAdd', async (reaction, user) => {
                if (user.bot) {
                    return
                }
                if (reaction.emoji.name === '1️⃣') {
                    editthis.edit(genCategoryHelp('Config'));
                }
                if (reaction.emoji.name === '2️⃣') {
                    editthis.edit(genCategoryHelp(`Dev`));
                }
                if (reaction.emoji.name === '3️⃣') {
                    editthis.edit(genCategoryHelp(`Fun`));
                }
                if (reaction.emoji.name === '4️⃣') {
                    editthis.edit(genCategoryHelp(`Info`));
                }
                if (reaction.emoji.name === '5️⃣') {
                    editthis.edit(genCategoryHelp(`Misc`));
                }
                if (reaction.emoji.name === '6️⃣') {
                    editthis.edit(genCategoryHelp(`Moderation`));
                }
                if (reaction.emoji.name === '7️⃣') {
                    editthis.edit(genCategoryHelp(`Reaction Roles`));
                }
                message.client.on('messageReactionRemove', async (reaction, user) => {
                    if (user.bot) {
                        return
                    }
                    if (reaction.emoji.name === '1️⃣') {
                        editthis.edit(genEmber(`-`));
                    }
                    if (reaction.emoji.name === '2️⃣') {
                        editthis.edit(genEmber(`-`));
                    }
                    if (reaction.emoji.name === '3️⃣') {
                        editthis.edit(genEmber(`-`));
                    }
                    if (reaction.emoji.name === '4️⃣') {
                        editthis.edit(genEmber(`-`));
                    }
                    if (reaction.emoji.name === '5️⃣') {
                        editthis.edit(genEmber(`-`));
                    }
                    if (reaction.emoji.name === '6️⃣') {
                        editthis.edit(genEmber(`-`));
                    }
                    if (reaction.emoji.name === '7️⃣') {
                        editthis.edit(genEmber(`-`));
                    }

                }
                );
            })
        })
    }
}