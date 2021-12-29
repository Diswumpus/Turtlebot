// const Discord = require('discord.js');
// const kfsRoot = require("key-file-storage");
// const kfs = kfsRoot.default('data/noidea');

// module.exports = {
//     name: 'send',
//     category: 'Dev',
//     description: '-',
//     execute(message, Member, args) {
//         if (message.author.id === '820465204411236362') {
//             let idd = args[0]
//             let msgg = args[1]
//             let msgData = kfs.msgData;
//             let authorId = msgData[idd];
//             message.client.users.cache.get(`${authorId}`).send(`${msgg}`);
//         }
//     },
// };