/*
    mid: String,
    role: String,
    button: String,
    guild: String,
    id: String
*/
const Discord = require('discord.js');
const brs = require('../../models/br');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    name: 'button-roles',
    aliases: ['br'],
    category: 'Reaction Roles',
    description: 'Create\'s a new button role!',
    async execute(message, Member, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return
        //Define filter
        const filter = m => m.author.id === message.author.id;
        //Create embeds:
        const cembed = new Discord.MessageEmbed()
            .setTitle('Channel')
            .setDescription('Please mention a channel.')
            .setColor(message.client.confiig.color)
        const rembed = new Discord.MessageEmbed()
            .setTitle('Role')
            .setDescription('Please mention a role.')
            .setColor(message.client.confiig.color)
        const timeEnd = new Discord.MessageEmbed()
            .setTitle('Time has ended!')
            .setColor(message.client.confiig.color)
        message.channel.send({ embeds: [cembed] }).then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 70000, errors: ['time'] }).then(collected1 => {
                const channel = collected1.first().mentions.channels.first();
                if (!channel) return message.channel.send({ content: 'Wrong Response, Button Role Builder Cancelled' })
                message.channel.send({ embeds: [rembed] }).then(() => {
                    message.channel.awaitMessages({ filter, max: 1, time: 70000, errors: ['time'] }).then(async collected2 => {
                        const role = collected2.first().mentions.roles.first();
                        const roles = new Array()
                        roles.push(Array.from(collected2.first().mentions.roles)[1][1] || null)
                        roles.push(Array.from(collected2.first().mentions.roles)[0][1] || null)
                        roles.push(Array.from(collected2.first().mentions.roles)[2][1] || null)
                        if (!role) return message.channel.send({ content: 'Wrong Response, Button Role Builder Cancelled' })
                        roles.forEach(role => {
                            if (role.managed) {
                                return message.channel.send({ content: `Please do not use a integration role. \nRole: ${role}` })
                            }
                        });
                        if (!role) return message.channel.send('No role, Button Role builder canceled');
                        //Create uuid's
                        const uid = uuidv4();
                        const uid1 = uuidv4();
                        const uid2 = uuidv4();
                        const uid3 = uuidv4();
                        //Create button
                        if (!role || !channel) return
                        const row = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId(uid)
                                    .setLabel(`${roles[0].name}`)
                                    .setStyle('PRIMARY')
                            );
                        if (roles[1]) {
                            row.addComponents(
                                new Discord.MessageButton()
                                    .setCustomId(uid1)
                                    .setLabel(`${roles[1].name}`)
                                    .setStyle('SECONDARY')
                            );
                        }
                        if (roles[2]) {
                            row.addComponents(
                                new Discord.MessageButton()
                                    .setCustomId(uid2)
                                    .setLabel(`${roles[2].name}`)
                                    .setStyle('SUCCESS')
                            );
                        }
                        //Create embed
                        const sendembed = new Discord.MessageEmbed()
                            .setDescription(`Click here to get the ${roles.map(a => a)} role(s)`)
                            .setColor('GREEN')
                        //Send message
                        const m = await channel.send({ embeds: [sendembed], components: [row] })
                        //Add to db
                        const dbsave = new brs({
                            mid: m.id,
                            role1: roles[0].id,
                            role2: roles[1]?.id || null,
                            role3: roles[2]?.id || null,
                            button1: uid,
                            button2: uid1 || null,
                            button3: uid2 || null,
                            guild: message.guild.id,
                            id: uid3
                        });
                        await dbsave.save().catch(e => console.log(e));
                        //Reply to msg
                        const membed = new Discord.MessageEmbed()
                            .setTitle(`${require('../../emojis.json').check} Created!`)
                            .addField('ID:', `${uid3}`, true)
                            .addField('Role:', `${roles.map(a => a)}`, true)
                            .setDescription(`[Jump to message](${m.url})`)
                        message.channel.send({ embeds: [membed] })
                    }).catch(err => { message.channel.send({ embeds: [timeEnd] }) && console.log(err) })
                }).catch(err => { message.channel.send({ embeds: [timeEnd] })  && console.log(err) })
            }).catch(err => { message.channel.send({ embeds: [timeEnd] }) && console.log(err)})
        })
    },
};