const Discord = require("discord.js")
const darkemail = require("random-email");
const darkpassword = require("generate-password");
const darkrandom = require("random");
const hackk = require('./hack.json');

module.exports = {
    name: "hack",
    category: 'Fun',
    description: "Shows your rank",
    async execute(message, Member, args) {
        try {
        const hackuser = message.mentions.users.first()
        const lastdm = [
            `${hackk.dm1}`,
            `${hackk.dm2}`,
            `${hackk.dm3}`,
            `${hackk.dm4}`,
            `${hackk.dm5}`
        ]
        if(hackuser.bot === true){
            return message.reply(
                new Discord.MessageEmbed()
                .setTitle(`${require('../../emojis.json').x} We can't hack bots!`)
                .setColor(`RED`)
                .setDescription(`${message.author.tag} tried to hack ${hackuser.tag}!`)
            )
        }
        const mostCommon = [
            `${hackk.mc1}`, 
            `${hackk.mc2}`, 
            `${hackk.mc3}`,
            `${hackk.mc4}`, 
            `${hackk.mc5}`, 
            `${hackk.mc6}`
        ]
        const msg = await message.channel.send(`We are about to hack ${hackuser.tag}!`)
        const impostorpassword = darkpassword.generate({
            length: 10,
            numbers: true,
        });
        setTimeout(async function () {
            await msg.edit(
                `[▘] Finding discord login... (2fa bypassed)`)//keys - ▘|▝ | ▖| ▗
        }, 2000)
        setTimeout(async function () {
            await msg.edit(
                `[▝] Email: \`${darkemail({
                    domain: "gmail.com",
                })}\`\nPassword: \`${impostorpassword}\``)
        }, 4000)
        setTimeout(async function () {
            await msg.edit(
                `[▖] Last DM: "${lastdm[Math.floor(Math.random() * lastdm.length)]}"`)
        }, 6000)
        setTimeout(async function () {
            await msg.edit(
                `[▗] Finding IP address...`)
        }, 8000)
        setTimeout(async function () {
            await msg.edit(
                `[▘] IP address: \`127.0.0.1:${darkrandom.int(100, 9999)}\``)
        }, 10000)
        setTimeout(async function () {
            await msg.edit(
                `[▝] Finding most common word...`)
        }, 20000)
        setTimeout(async function () {
            await msg.edit(
                `[▖] Most Common Word = "${
                    mostCommon[Math.floor(Math.random() * mostCommon.length)]
                  }".`)
        }, 30000)
        setTimeout(async function () {
            await msg.edit(
                `[▗] Selling data to the Government...`)
        }, 40000)
        setTimeout(async function () {
            await msg.edit(
                `[▘] Reporting account to discord for breaking ToS...`)
        }, 50000)
        setTimeout(async function () {
            await msg.edit(
                `[▝] Finished hacking ${hackuser.tag}`)
        }, 60000)
        setTimeout(async function () {
            await msg.edit(
                `[▖] The hack was completed..`)
        }, 70000)
    } catch (error) {
        console.error(error);
    }
    },
};