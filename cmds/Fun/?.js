const Discord = require('discord.js');
const { TicTacToe } = require('weky')
/*
module.exports = {
    name: 'tw',
    description: 'A embed template',
    category: 'Fun',
    async execute(message, Member, args) {
        const opponent = message.mentions.users.first();
        if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);
        const game = new TicTacToe({
            message: message,
            opponent: opponent, //opponent
            xColor: 'red', //x's color
            oColor: 'blurple', //zero's color
            xEmoji: '❌',  //the x emoji
            oEmoji: '0️⃣' ,//the zero emoji
        })
        game.start()//start da game
    },
};
*/