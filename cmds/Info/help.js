module.exports = {
	name: 'help',
    category: 'Info',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, member, args) {
        const data = [];
        const { commands } = message.client;
        const { config } = message.client;
        if (!args.length) {
        data.push('Here\'s a list of all my commands:');
        //data.push(commands.groupBy(c => c.category).map(command => `${command.category} - ${command.name}`).join(', '));
        data.push(commands.map(command => `${command.category} - ${command.name}`).join(', '));
        data.push(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`);
        
        // if (message.content.startsWith(`${config.prefix}help`)) {
        //     let whoisEmbed = new Discord.MessageEmbed()
        //         .setTitle(`Commands`)
        //         .setColor("AQUA")
        //         //        .setDescription(`Basic`)
        //         .addField("Basic", "None")
        //         .setFooter("Turtlebot")
        //     message.channel.send(whoisEmbed)
    
    
        // }

        return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            
            if (!command) {
                return message.reply('that\'s not a valid command!');
            }
            
            data.push(`**Name:** ${command.name}`);
            
            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);
            
            //data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
            
            message.channel.send(data, { split: true });            
        }
        
	},
};