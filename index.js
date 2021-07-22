const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const klawSync = require('klaw-sync')
const plugin_manager = require('./models/plugins/plugin_manager');
const version = require('./version.json');
const configg = require('./config2.json')
const mongoose = require('mongoose');
const Levels = require("discord-xp");
const Schema = mongoose.Schema;
const prefix = require('./models/prefix');
const commandsss = require('./models/commands')
const moment = require('moment')
const settings = require('./models/settings')
const emojijson = require('./emojis.json');
const banmodel = require('./models/ban');
const dt = require('discord-turtle');


mongoose.connect(config.mongoose, { useNewUrlParser: true, useUnifiedTopology: true })
let vernum = version.versionnum;
//const keyv = new Keyv('sqlite:react.sqlite');
//keyv.on('error', err => console.error('Keyv connection error:', err));
// at the beginning of your code:
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_INTEGRATIONS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"],


    // presence: {
    //     status: 'online',
    //     activities: [{ name: `Your server! | v${vernum}`, type: 'WATCHING' }],
    // }
});
//Slash commands are out!!
//Your server! ${config.prefix}help | WATCHING
const roleName = '2 Month Supporter';
module.exports.client = client

//client.snipes = new Discord.Collection();

client.once('ready', async () => {
    Levels.setURL(config.mongoose);
    const activities = [
        { name: `Your Server | v${vernum}`, type: 'WATCHING' },
        { name: `Your Server | v${vernum}`, type: 'WATCHING' }
    ];


    client.user.setPresence({ status: 'online', activity: activities[0] });

    let activity = 1;


    setInterval(() => {
        activities[2] = { name: `${config.prefix}help | ${client.guilds.cache.size} guilds`, type: 'WATCHING' };
        activities[3] = { name: `${config.prefix}help | ${client.users.cache.size} users`, type: 'WATCHING' };
        if (activity > 3) activity = 0;
        client.user.setActivity(activities[activity]);

        activity++;
    }, 10000);
});

client.commands = new Discord.Collection();
client.slashcmds = new Discord.Collection();
client.snipes = new Discord.Collection();
client.config = config;
client.site = configg.website;
client.cooldowns = new Discord.Collection();
client.confiig = configg;
client.version = version;
//client.disbut = require('discord-buttons')(client);
const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
// Here we load all the commands into client.commands
for (const file of slashFiles) {
    const command = require(`./slash/${file}`);
    console.log(`loading slash/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.slashcmds.set(command.name, command);
}
const ownderr = client.users.cache.get(config.ownerID)
const errorr = new Discord.MessageEmbed()
    .setTitle(`That's a 404`)
    .setColor(`YELLOW`)
    .setDescription(`This is a problem at our end we are clearing it up, please try again in a bit if it still does not work use ,problem`)
    .setImage(`https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kow11oq1p9a.png`)

client.on('interaction', async interaction => {
    if (!interaction.isCommand()) return;
    console.log(`received interaction ${interaction.commandName} by ${interaction.user.tag}`);
    const commandName = interaction.commandName;

    const command = client.slashcmds.get(commandName);
    const banres = await banmodel.findOne({
        user: interaction.user.id
    });
    if(banres?.user === interaction.user.id){
        let embed = new Discord.MessageEmbed()
        if(banres.action === 'timeout'){
            embed.setTitle(`${emojijson.ban}`)
            embed.setDescription(`You can use this command again ${await dt.timestamp(Math.round(new Date(Number(banres.time)).getTime() / 1000))}`)//(new Date).valueOf()
            embed.setColor(configg.color)
        } else if(banres.action === 'ban'){
            embed.setTitle(`${emojijson.ban}`)
            embed.setDescription(`You have been banned from Turtlebot!`)
            embed.setColor(configg.color)
        }
        const rowsend = await require('./interactions').link(configg.invite, `Support Server`)
        return interaction.reply({ embeds: [embed], components: [rowsend], ephemeral: true });
    }
    if (command) {
        if (commandName !== 'pets-view' || commandName !== 'buy-pet') {
            let cmdsa = await commandsss.findOne({
                user: interaction.user.id
            });

            if (!cmdsa) {
                cmdsa = new commandsss({
                    user: interaction.user.id,
                    uses: 0,
                    hungry: false,
                    lastfead: Date.now()
                });
                await cmdsa.save().catch(e => console.log(e));
            };
            await commandsss.findOne({
                user: interaction.user.id
            }, async (err, dUser) => {
                if (err) console.log(err);
                dUser.uses += 1;
                await dUser.save().catch(e => console.log(e));
            });
        }
    }
    if (!command) {
        // interaction.reply(`Sorry i don't think /${commandName} is possible ${opps}`);
    }
    else {
        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            // interaction.reply(`Something went very wrong ${opps}`);
        }
    }
});

const messagess = mongoose.model('messagess', Schema({
    id: String,
    guild: String,
    messagecount: Number
}));
client.messagess = messagess

// FIX THIS _______ if (reaction.message.channel.id == '839989770045620255') {
const myGuilds = new Set();
myGuilds.add('842575277249921074');
myGuilds.add('824365717573992480');

const discordinvites = new Set();
discordinvites.add('discord.gg');
discordinvites.add('discordapp.com/invite');
discordinvites.add('discord.com/invite');
discordinvites.add('dsc.gg');
discordinvites.add('discord.io');
discordinvites.add('discord.me');
discordinvites.add('discord.');
client.on("message", message => {
    const args = message.content.split(" ").slice(1);
    const clean = text => {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    if (message.content.startsWith(config.prefix + "eval")) {
        if (message.author.id !== config.ownerID) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});
client.on("message", async (message) => {
    if (message?.member?.permissions.has('ADMINISTRATOR')) {
        return;
    }
    const thedata = await settings.findOne({
        GuildID: message.guild?.id
    });
    if (message.guild && myGuilds.has(message.guild.id)) {// && !message.member.permissions.has('ADMINISTRATOR')
        if (!message.member.roles.cache.some(r => thedata.roles.includes(r.id))) {
            if (message.content.toLowerCase().includes('discord.gg' || 'discordapp.com/invite' || 'discord.com/invite' || 'dsc.gg' || 'discord.io' || 'discord.me')) { //if it contains an invite link
                const messagedelembed = new Discord.MessageEmbed()
                    .setTitle(`Your link has been deleted!`)
                    .setColor('RED')
                    .setDescription(`[This](${message.url}) has been deleted`)
                    .setFooter('Invite links are not permitted on this server')
                message.delete() //delete the message
                    .then(message.author.send({ embeds: [messagedelembed] }))
            }
        }
    }
})
// L E V E L S = >
client.on("message", async (message) => {

    let messageUser = await messagess.findOne({
        id: message.author.id
    });

    if (!messageUser) {
        messageUser = new messagess({
            id: message.author.id,
            messagecount: 0
        });
        await messageUser.save().catch(e => console.log(e));
    };

    await messagess.findOne({
        id: message.author.id
    }, async (err, dUser) => {
        if (err) console.log(err);
        dUser.messagecount += 1;
        await dUser.save().catch(e => console.log(e));
    });
})
client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const levelSettings = await plugin_manager.findPlugin(message.guild.id, 'LEVELS');
    if(!levelSettings.object?.ENABLED) return
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp || message.content === ';levels') {
        let schannel = await settings.findOne({
            GuildID: message.guild.id
        });
        const channel = message.guild.channels.cache.get(levelSettings.object.CHANNEL) || message.channel
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const emojiiii = client.emojis.cache.get('836421450252550199')
        const anotheremoji = client.emojis.cache.get('846908253740204072');
        if(levelSettings.object.LEVELMESSAGE.includes('{{ -d }}')){
        const levelupembed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}, congratulations!`)
            .setDescription(`You have leveled up to **${user.level}**   ${emojiiii}`)
            .setColor('GREEN')
            .setThumbnail(anotheremoji.url)
            channel.send({ embeds: [levelupembed], content: `${message.author} ${require('./emojis.json').completed}` });
        } else if(levelSettings.object.LEVELMESSAGE){
            channel.send({ content: levelSettings.object.LEVELMESSAGE
                .replace('{{user}}', message.author)
                .replace('{{level}}', user.level)
            });
        }
    }
});

const emojii = require('./models/emojis')
// EMOJI STUFF
client.on('message', async message => {
    const hasEmoteRegex = /<a?:.+:\d+>/gm
    const emoteRegex = /<:.+:(\d+)>/gm
    const animatedEmoteRegex = /<a:.+:(\d+)>/gm
    let emoji
    const messages = await message.channel.messages.fetch()
    //const message = await messages.find(m => m.content.match(hasEmoteRegex))
    const words = message.content.split(" ");
    words.forEach(async w => {
        if (!emoji) return
        if (emoji = emoteRegex.exec(w) || animatedEmoteRegex.exec(w)) {
            let messageUser = await emojii.findOne({
                emoji: emoji[0]
            });

            if (!messageUser) {
                messageUser = new emojii({
                    emoji: emoji[0],
                    user: message.author.id,
                    guild: message.guild.id,
                    uses: 0
                });
                await messageUser.save().catch(e => console.log(e));
            };

            await emojii.findOne({
                emoji: emoji[0]
            }, async (err, dUser) => {
                if (err) console.log(err);
                dUser.uses += 1;
                await dUser.save().catch(e => console.log(e));
            });
            console.log(`Added ${emoji[0]}`)
        }

    });

});
// L E V E L S -

client.on("messageDelete", async (message) => {
    try {
        let schannel = await settings.findOne({
            GuildID: message.guild.id
        });
        if (schannel.autosnipe !== true) {
            return
        }
        if (message.member.permissions.has('MANAGE_MESSAGES')) { return; }
        if (message.author.bot) return;
        const snipes = message.client.snipes.get(message.channel.id) || [];
        snipes.unshift({
            content: message.content,
            author: message.author,
            image: message.attachments.first()
                ? message.attachments.first().proxyURL
                : null,
            date: new Date().toLocaleString("en-GB", {
                dataStyle: "full",
                timeStyle: "short",
            }),
        });
        snipes.splice(10);
        message.client.snipes.set(message.channel.id, snipes);
        let embed = new Discord.MessageEmbed()
            .setTitle(`New message deleted!`)
            .setDescription(
                `**The user ${message.author.tag} has deleted a message in <#${message.channel.id}>**`
            )
            .addField(`Content`, message.content, true)
            .setColor(`RED`);
        let channel = message.guild.channels.cache.get(schannel.autosnipech);
        if (!channel) return;
        channel.send({ embeds: [embed] });
    } catch (e) { }
});
client.on('message', message => {
    if (message.content === 'b;guildc') {
        message.delete();
        client.emit('guildCreate', message.guild);
    }
});

// 2) Streams example, non for-await.
// Print out all JS files along with their size within the current folder & subfolders.
var commandFiles = klawSync('./cmds', { nodir: true, traverseAll: true, filter: f => f.path.endsWith('.js') })
for (const file of commandFiles) {
    const command = require(`${file.path}`);
    console.log(`loading ${command.category}/${command.name}: ${file.path}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
client.on('message', async message => {
    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`);
    // if (!prefixRegex.test(message.content)) return;
    if (message.content.match(mentionRegex)) {
        const data = await prefix.findOne({
            GuildID: message.guild.id
        });
        let currentPrefix = data?.Prefix ?? config?.prefix;

        if (data) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setTitle(`Hey there!`)
                        .setDescription(`My prefix is \`${config?.prefix}\` or you can use \`${data?.Prefix}\``)
                        .setColor(configg.color)
                ]
            })
        } else if (!data) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setTitle(`Hey there!`)
                        .setDescription(`My prefix is \`${config.prefix}\``)
                        .setColor(configg.color)
                ]
            })
        }
    }
});//await 
let cmdsas = commandsss.findOne({
    hungry: false
});

setInterval(function () {
    var ONE_HOUR = 60 * 60 * 1000;
    //var ONE_HOUR = 60; /* ms */
    //const one = new Date(cmds.lastfead.getTime() + ONE_HOUR)
    //if(((new Date) - cmdsas.lastfead) > ONE_HOUR){
    const lessThanOneHourAgo = (date) => {
        return moment(date).isAfter(moment().subtract(1, 'hours'));
    }
    if (lessThanOneHourAgo(cmdsas.lastfead)) {
        if (cmdsas?.hungry === true || cmdsas?.hungry === 'undefined' || cmdsas?.hungry === undefined) {
            return;
        }
        commandsss.findOne({
            hungry: false
        }, async (err, dUser) => {
            if (err) console.log(err);
            dUser.hungry = true;
            await dUser.save().catch(e => console.log(e));
        });
    }
}, 4000);
/*
commandsss.findOne(
async (err, dUser) => {
if (err) console.log(err);
dUser.hungry = true;
await dUser.save().catch(e => console.log(e));
});


    user: String,
uses: Number,
hungry: Boolean,
lastfead: Number
*/
// Client events
client.on('message', async message => {

    //if(message.content.startsWith(`${prefix}tpwhois`)){
    var Member;
    const { cooldowns } = client;
    var differentDays = 0;
    if (message.mentions.members) {
        Member = message.mentions.members.first()
        if (!Member) {
            Member = message.member
        }
    }

    if (Member) {
        var joinedSince = new Date() - Member.joinedAt
        differentDays = Math.round(joinedSince / (1000 * 3600 * 24));
    }
    message.differentDays = differentDays;
    message.client = client;
    if (message.author.bot) {
        return
    }
    const data = await prefix.findOne({
        GuildID: message.guild?.id
    });
    let configStart = message.content.startsWith(config?.prefix);
    let dataStart = message.content.startsWith(data?.Prefix);
    if (configStart || dataStart) {
        let currentPrefix = configStart ? config?.prefix : data?.Prefix;

        const args = message.content.slice(currentPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        const banres = await banmodel.findOne({
            user: message.author.id
        });
        if(banres?.user === message.author.id){
            let embed = new Discord.MessageEmbed()
            if(banres.action === 'timeout'){
                embed.setTitle(`${emojijson.ban}`)
                embed.setDescription(`You can use this command again ${await dt.timestamp(Math.round(new Date(Number(banres.time)).getTime() / 1000))}`)//(new Date).valueOf()
                embed.setColor(configg.color)
            } else if(banres.action === 'ban'){
                embed.setTitle(`${emojijson.ban}`)
                embed.setDescription(`You have been banned from Turtlebot!`)
                embed.setColor(configg.color)
            }
            const rowsend = await require('./interactions').link(configg.invite, `Support Server`)
            return message.channel.send({ embeds: [embed], components: [rowsend] });
        }
        if (command?.owneronly === true && message.author.id !== config.ownerID) {
            const owembed = new Discord.MessageEmbed().setTitle(`${emojijson.x}`).setDescription(`This is a owner only command!\n\nTry something else.. Feel like this is a command for everyone? Report it [here](${configg.invite})`)
            const link2 = await require('./interactions').link(configg.invite, `Support Server`)
            return message.channel.send({ embeds: [owembed], components: [link2] })
        }
        if (command) {
            console.log(`${commandName} was executed by ${message.author.tag}`);
            if (message.channel.type === 'dm') {
                const nodms = new Discord.MessageEmbed()
                    .setTitle(`I can\'t execute ${commandName} inside DMs!`)
                    .setColor('RED')
                    const link2 = await require('./interactions').link(configg.invite, `Support Server`)
                return message.channel.send({ embeds: [nodms], components: [link2] });
            }
            if (command.args && !args.length) {
                const noargss = new Discord.MessageEmbed()
                    .setTitle(`You didn't provide any arguments!`)
                    .setColor('RED')
                if (command.usage) {
                    noargss.setDescription(`The proper usage would be: \`${prefix}${command.name} ${command.usage}\``);
                }
                return message.channel.send({ embeds: [noargss] });
            }
            if(command?.permissions){
            if(!Member.permissions.has(`${command.permissions}`)){
                const noperms = new Discord.MessageEmbed()
                .setTitle(`${emojijson.x} You do not have permissions!`)
                .setColor(configg.color)
                .setDescription(`You must have the \`${command.permissions}\` permission to use this command!`)
                return message.channel.send({ embeds: [noperms] });
            }
            }
        }
        if (command) {
            if (commandName !== 'pets-view' || commandName !== 'buy-pet') {
                let cmdsa = await commandsss.findOne({
                    user: message.author.id
                });

                if (!cmdsa) {
                    cmdsa = new commandsss({
                        user: message.author.id,
                        uses: 0,
                        hungry: false,
                        lastfead: Date.now()
                    });
                    await cmdsa.save().catch(e => console.log(e));
                };
                await commandsss.findOne({
                    user: message.author.id
                }, async (err, dUser) => {
                    if (err) console.log(err);
                    dUser.uses += 1;
                    dUser.hungry = false
                    dUser.lastfead = Date.now()
                    await dUser.save().catch(e => console.log(e));
                });
            }
        }
        if (command) {
            await command.execute(message, Member, args);
        } else {
            console.log(`Couldn't find ${commandName}`);
        }
    }
});
client.on('message', message => {
    if (message.content === ';join') {
        //message.delete();
        client.emit('guildMemberAdd', message.member);
    }
});
client.on('message', message => {
    if (message.content === ';leave') {
        message.delete();
        client.emit('guildMemberRemove', message.member);
    }
});
client.on('guildMemberAdd', async (message) => { // this event gets triggered when a new member joins the server!
    //Find the setting for the server
    let welcomechannel = await settings.findOne({
        GuildID: message.guild.id
    });
    if (welcomechannel?.welcome !== true) {
        return
    }
    //if (message.guild && myGuilds.has(message.guild.id)) {
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    //const Channel = member.guild.channels.cache.get('channelid') //insert channel id that you want to send to
    const channel = message.guild.channels.cache.get(welcomechannel.welcomech); //** This is telling the script which server to send teh message in**\\
    const serverName = message.guild.name
    //const rulech = message.guild.channels.cache.find(ch => ch.name.includes("rules"));
    if (!channel) return;
    const blob1 = client.emojis.cache.get('835250126087389194');
    //making embed
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(message.user.displayAvatarURL())
        .setTitle(`**${message.displayName} Joined**`)
        .addField(`Welcome to ${serverName} ${blob1}`, `Hope you have a pleasant stay ${message.displayName}! Thanks for joining ${serverName} ${message.displayName}`)
        .setFooter(`${serverName}`, blob1.url)
    // sends a message to the channel
    channel.send({ embeds: [embed] })
    //}
})
client.on('guildMemberRemove', async (message) => { // this event gets triggered when a new member leaves the server!
    //Find the setting for the server
    let welcomechannel = await settings.findOne({
        GuildID: message.guild.id
    });
    if (welcomechannel?.welcome !== true) {
        return
    }
    //if (message.guild && myGuilds.has(message.guild.id)) {
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    //making embed
    const channel = message.guild.channels.cache.get(welcomechannel.welcomech); //** This is telling the script which server to send teh message in**\\
    if (!channel) return;
    const serverName = message.guild.name
    const blob2 = client.emojis.cache.get('635255789329580053') ?? client.emojis.cache.get('855262242215690251');
    let embede = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(message.user.displayAvatarURL())
        .setTitle('A member left the server')
        .setDescription(`**${message.displayName}** has left ${serverName}, we now have ${message.guild.memberCount} members!`)
        .setFooter(`${serverName}`, blob2.url)
    // sends a message to the channel
    channel.send({ embeds: [embede] })
    //}
})

setInterval(async () => {
    const results = await banmodel.find()

    if (results && results.length) {
        for (const result of results) {
            if (Date.now() >= Number(result.time)) {
                await banmodel.findOneAndDelete({
                    user: result.user
                });
            }

        }
    }

}, 1000)

client.login(config.token);
//client.user.setActivity(',help');