// const Discord = require('discord.js');
// const { ChaosWords } = require("weky");
// var randomWords = require('random-words');

// module.exports = {
// 	name: 'chaoswords',
//     async execute(client, interaction) {
//         const words = randomWords(2) // generating 2 words
//         await new ChaosWords({
//             message: interaction,
//             maxTries: 8, //max number  of user's tries (ends when reach limit)
//             charGenerated: 20, //length of sentence (small length might throw error)
//             words: words, //words (array) => ['word']
//             embedTitle: 'Chaos words!', //understable
//             embedFooter: 'Find the words in the sentence!',
//             embedColor: client.confiig.color
//             }).start()
// 	},
// };