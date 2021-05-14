const Discord = require('discord.js');

module.exports = {
    name: 'register',
    description: 'DEV ONLY',
    async execute(message, Member, args) {
        const client = message.client
        if (!client.application?.owner) await client.application?.fetch();
//https://discord.com/oauth2/authorize?client_id=841782635386109972&scope=bot+applications.commands
        const data = {
            name: 'avatar',
            description: 'Gives the mentioned users avatar',
            options: [{
				name: 'user',
				type: 'USER',
				description: 'What user?',
				required: true,
			}],
        };

        const command = await client.application?.commands.create(data);
        console.log(command);
    }
}

//hint =>

// module.exports = {
//     name: 'register',
//     description: '-',
//     async execute(message, Member, args) {
//         const client = message.client
//         if (!client.application?.owner) await client.application?.fetch();
// //https://discord.com/oauth2/authorize?client_id=841782635386109972&scope=bot+applications.commands
//         const data = {
//             name: 'hint',
//             description: 'Says how many characters are correct',
//             options: [{
// 				name: 'guess',
// 				type: 'STRING',
// 				description: 'The input which should be echoed back',
// 				required: true,
// 			}],
//         };

//         const command = await client.guilds.cache.get('841737708825215047')?.commands.create(data);
//         console.log(command);
//     }
// }