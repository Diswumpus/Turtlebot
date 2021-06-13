const Discord = require('discord.js');

module.exports = {
    name: 'register',
    description: 'DEV ONLY',
    async execute(message, Member, args) {
        const client = message.client
        if (!client.application?.owner) await client.application?.fetch();
//https://discord.com/oauth2/authorize?client_id=841782635386109972&scope=bot+applications.commands
        const data = {
            name: 'embed',
            description: 'Creates an embed',
            options: [{
                name: 'channel',
				type: 'CHANNEL',
				description: 'What is the channel it should be sent in?',
				required: false,
            },
            {
                name: 'title',
				type: 'STRING',
				description: 'What is the title',
				required: false,
            },
            {
                name: 'description',
				type: 'STRING',
				description: 'What is the description',
				required: false,
            },
            {
                name: 'color',
				type: 'STRING',
				description: 'What is the color',
				required: false,
            },
            {
                name: 'thumbnail',
				type: 'STRING',
				description: 'What is the thumbnail - Must be a url',
				required: false,
            },
            {
                name: 'author',
				type: 'STRING',
				description: 'What is the author',
				required: false,
            },
            {
                name: 'field_1',
				type: 'STRING',
				description: 'Should i add a 1 field?',
				required: false,
            },
            {
                name: 'field_2',
				type: 'STRING',
				description: 'Should i add a 2 field?',
				required: false,
			}],
        };

        //const command = await client.application?.commands.create(data);
        //const command = await client.guilds.cache.get('842575277249921074')?.commands.create(data);
        //await command.setPermissions(permissions);
        console.log(command ?? 'Null');
    }
}


//Announce Options =>

// options: [{
//     name: 'channel',
//     type: 'CHANNEL',
//     description: 'What channel should i announce this in?',
//     required: true,
    
//     name: 'title',
//     type: 'STRING',
//     description: 'What should i announce?',
//     required: true,
// }],


//Slash server =>
//const command = await client.guilds.cache.get('842575277249921074')?.commands.create(data);
//const command = await client.application?.commands.create(data);
//Turtlepaw's =>
//const command = await client.guilds.cache.get('824365717573992480')?.commands.create(data);
//Turtlebot =>
//const command = await client.guilds.cache.get('834199640702320650')?.commands.create(data);
// const permissions = [
//     {
//         id: '820465204411236362',
//         type: 'USER',
//         permission: true,
//     },
// ];