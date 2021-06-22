const { get } = require('node-superfetch')
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
//const db = require('quick.db');
const choices = ['1', '2', '3', '4'];
//const util = require('../../utilquiz.js')
module.exports = {
    name: 'quiz',
    category: 'Fun',
    description: 'Quiz time!',
    async execute(message, Member, args) {
    // let TotalQuiz;
    // let quizNew = await db.fetch(`quizNew_${message.author.id}`)
    // if (quizNew === null) db.set(`quizNew_${message.author.id}`, 0);
    // else TotalQuiz = quizNew;
    // if (TotalQuiz === undefined) TotalQuiz = 1;

    try {
        const { body } = await get('https://opentdb.com/api.php?amount=4')
            .query({
                amount: 1
            });
        let difficult = body.results[0].difficulty;
        let category = body.results[0].category;
        let question = body.results[0].question;
        let type = body.results[0].type;
        let bad = body.results[0].incorrect_answers;
        let answer = body.results[0].incorrect_answers;
        answer.push(body.results[0].correct_answer);
        let correct_idx = answer.indexOf(body.results[0].correct_answer)+1
        //answer = util.shuffle(answer);
        const embed = new MessageEmbed()
            .setAuthor('Quiz!', message.client.user.displayAvatarURL())
            .setColor(message.client.confiig.color)
            .setDescription(`**${decodeURIComponent(body.results[0].question)}**\n\n` + answer.map((x, i) => `**${choices[i]} »** \`${decodeURIComponent(x)}\``).join('\n'))
            .addField('**Difficulty**', `\`${decodeURIComponent(difficult)}\``, true)
            .addField('**Quiz Genre**', `\`${decodeURIComponent(category)}\``, true)
            .addField('**Type**', `\`${decodeURIComponent(type)}\``, true)
            .setFooter('You have 30 seconds to answer this! | $40 Reward if Answered Correctly')
        message.channel.send({ embeds: [embed] });
        const filter = res => choices.includes(res.content) && res.author.id === message.author.id
        const reply = await message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000
        });
        const timeremoji = message.client.emojis.cache.get('846868929065517066')
        const no = message.client.emojis.cache.get('849400604601876490')
        const yes = message.client.emojis.cache.get('849400604576841738')
        const tada = message.client.emojis.cache.get('836421450252550199')
        const noembed = new Discord.MessageEmbed()
        .setTitle(`Time's Up! ${timeremoji}`)
        .setDescription(`Nobody won! ${no}`)
        .addField('The correct answer was:', correct_idx.toString())
        .setColor(message.client.confiig.color)
        if (reply.first().content !== correct_idx.toString()) {
             message.channel.send({ embeds: [noembed] });
        } else if(reply.first().content === correct_idx.toString()){
            const yesembed = new Discord.MessageEmbed()
            .setTitle(`Time's Up! ${timeremoji}`)
            .setDescription(`${reply.first().author} won the game! ${yes}\nCongrats! ${tada}`)
            .addField('The correct answer was:', correct_idx.toString())
            .setColor(message.client.confiig.color)
            message.channel.send({ embeds: [yesembed] })
        } else {
            console.warn('ok there\'s an error!')
        }

    } catch (error){
        console.log(error)
    }
}
}