const Discord = require('discord.js');
const { emojis, interactions } = require('../../util');

module.exports = {
    name: 'mregister',
    description: 'DEV ONLY',
        /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.User} Member 
     * @param {Array} args 
     */
    async execute(message, Member, args) {
        const { client } = message
        if (!client.application?.owner) await client.application?.fetch();
        /**
         * @type {Discord.CommandInteractionOption[]}
         */
        const datas = [{
            /*
                name: 'embed',
                description: 'Creates an embed',
                options: [{
                    name: 'channel',
			    	type: 'CHANNEL',
			    	description: 'What is the channel it should be sent in?',
			    	required: false,
                }]
            */
            name: 'guide',
            description: `Show's you the guide to use Turtlebot!`,
        }];

        /**
         * @type {Discord.CommandInteraction[]}
         */
        const commandsAdded = new Array();
        
        for(const data of datas){
            const command = await await client.guilds.cache.get('842575277249921074')?.commands.create(data);
            console.log(command);
            commandsAdded.push(command);
        }

        let forCommands = ``;
        for(const command of commandsAdded){
           forCommands += `\`/${command.commandName}\`` 
        }

        const embed = new Discord.MessageEmbed()
        .setTitle(`${emojis.check1} Created!`)
        .setDescription(`${emojis.slashCommand} ${forCommands}`)
        .setColor(client.color)
        message.channel.send({ embeds: [embed] });
    }
}
//Slash server =>
//const command = await client.guilds.cache.get('842575277249921074')?.commands.create(data);

//const command = await client.application?.commands.create(data);