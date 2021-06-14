const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const klawSync = require('klaw-sync')
const version = require('./version.json');
const configg = require('./config2.json')
const mongoose = require('mongoose');
const Levels = require("discord-xp");
const Schema = mongoose.Schema;
const prefix = require('./models/prefix');
const commandsss = require('./models/commands')
const moment = require('moment')


mongoose.connect(config.mongoose, { useNewUrlParser: true, useUnifiedTopology: true })
let vernum = version.versionnum;
//const keyv = new Keyv('sqlite:react.sqlite');
//keyv.on('error', err => console.error('Keyv connection error:', err));
// at the beginning of your code:
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_INTEGRATIONS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"],


    // presence: {
    //     status: 'online',
    //     activities: [{ name: `Your server! | v${vernum}`, type: 'WATCHING' }],
    // }
});
//Slash commands are out!!
//Your server! ${config.prefix}help | WATCHING
const roleName = '2 Month Supporter';

//client.snipes = new Discord.Collection();

client.once('ready', async () => {
    console.log('Ready!');
    const ownderr = client.users.cache.get(config.ownerID)
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
client.confiig = configg;
client.version = version;
//client.disbut = require('discord-buttons')(client);
const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
// Here we load all the commands into client.commands
for (const file of slashFiles) {
    const command = require(`./slash/${file}`);
    console.log(`loading slash/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.slashcmds.set(command.name, command);
}
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
    if(command){
        if(commandName !== 'pets-view' || commandName !== 'buy-pet'){
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
client.on('guildCreate', async guild => {

    let chan = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))

    // Embed
    let embed = new Discord.MessageEmbed()
        .setColor(client.confiig.color)
        .setAuthor(`\u200b`, client.user.displayAvatarURL())
        .setTitle(`Hello! I am Turtlebot!`)
        .addField("Make sure to use `,` with every command", '-')
        .setDescription("Hello, thank you for adding me. If you create a `bot-log` channel i will log deleted messages in there!\n If you create a `reports` channel i will log reports\n If you create a `tickets` channel i will log tickets!\n If you create a role called `2 Month Supporter` or use `,rsetup` after 60 days i will give them the role! Try some of my slash commands! `/rank`")
        .setFooter(`Made By ${ownderr.tag} | ,help`)
        .setImage('https://cdn.tixte.com/uploads/turtle.discowd.com/kotcuf1ik9a.png')
        .setTimestamp()

    // If no channels, it will dm the owner.
    chan.send(embed)
    // if(!chan) {
    //         guild.owner.send(embed)
    //     }  else if(chan) {
    //         chan.send(embed)
    //     }

    // Making an invite for server
    let inv = await chan.createInvite({
        maxAge: 0, // 0 = infinite expiration
        maxUses: 0 // 0 = infinite uses
      })

    // Log Channel for new servers
    const channel = client.channels.cache.get('846410648984354886')

    const secEmb = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setAuthor(`\u200b`, client.user.displayAvatarURL())
        .setDescription(`**New Server**
                Guild: ${guild.name}
                Users: ${guild.memberCount}
                Owner: Beta...
                Owner ID: ${guild.ownerID}
                Invite: \`${inv.url}\``)
        .setFooter(`Guild ID: ${guild.id}`)
        .setTimestamp()

    channel.send(secEmb)
})
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
discordinvites.add('discord');
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
    if (message.member.permissions.has('ADMINISTRATOR')) { 
        return;
    }
    if (message.guild && myGuilds.has(message.guild.id) && !message.member.permissions.has('ADMINISTRATOR')) {
        if (message.content.toLowerCase().includes('discord.gg' || 'discordapp.com/invite' || 'discord.com/invite' || 'dsc.gg' || 'discord.io' || 'discord.me')) { //if it contains an invite link
            const messagedelembed = new Discord.MessageEmbed()
                .setTitle(`Your link has been deleted!`)
                .setColor('RED')
                .setDescription(`[This](${message.url}) has been deleted`)
                .setFooter('Invite links are not permitted on this server')
            message.delete() //delete the message
                .then(message.author.send(messagedelembed))
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
    //   const doc = new messagess({
    //     id: message.author.id,
    //     guild: message.guild.id,
    //     messagecount: +1
    //   });
    //   // Inserts a new document with `name = 'Will Riker'` and
    //   // `rank = 'Commander'`
    //   await doc.save();
})
client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    }
});

const emojii = require('./models/emojis')
// EMOJI STUFF
client.on('message', async message => {
    const hasEmoteRegex = /<a?:.+:\d+>/gm
    const emoteRegex = /<:.+:(\d+)>/gm
    const animatedEmoteRegex = /<a:.+:(\d+)>/gm

    const messages = await message.channel.messages.fetch()
    //const message = await messages.find(m => m.content.match(hasEmoteRegex))
    const words = message.content.split(" ");
    words.forEach(async w => {
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
        let channel = message.guild.channels.cache.find(
            (ch) => ch.name === "bot-log"
        );
        if (!channel) return;
        channel.send(embed);
    } catch (e) { }
});
client.on('message', message => {
    if (message.content === ';guildc') {
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
            message.reply(
                new Discord.MessageEmbed()
                    .setTitle(`Hey there!`)
                    .setDescription(`My prefix is \`${config?.prefix}\` or you can use \`${data?.Prefix}\``)
                    .setColor(configg.color)
            )
        } else if (!data) {
            message.reply(
                new Discord.MessageEmbed()
                    .setTitle(`Hey there!`)
                    .setDescription(`My prefix is \`${config.prefix}\``)
                    .setColor(configg.color)
            )
        }
    }
});//await 
let cmdsas = commandsss.findOne({
    hungry: false
});

setInterval(function() {
    var ONE_HOUR = 60 * 60 * 1000;
    //var ONE_HOUR = 60; /* ms */
//const one = new Date(cmds.lastfead.getTime() + ONE_HOUR)
//if(((new Date) - cmdsas.lastfead) > ONE_HOUR){
    const lessThanOneHourAgo = (date) => {
        return moment(date).isAfter(moment().subtract(1, 'hours'));
    }
    if(lessThanOneHourAgo(cmdsas.lastfead)){
        if(cmdsas?.hungry === true || cmdsas?.hungry === 'undefined' || cmdsas?.hungry === undefined){
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
        GuildID: message.guild.id
    });
    let configStart = message.content.startsWith(config?.prefix);
    let dataStart = message.content.startsWith(data?.Prefix);
    if (configStart || dataStart) {
        let currentPrefix = configStart ? config?.prefix : data?.Prefix;

        const args = message.content.slice(currentPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        console.log(`${commandName} was executed by ${message.author.tag}`);
        //
        //
        //
        //
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(command){
            if(commandName !== 'pets-view' || commandName !== 'buy-pet'){
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
    //if (message.guild && myGuilds.has(message.guild.id)) {
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    //const Channel = member.guild.channels.cache.get('channelid') //insert channel id that you want to send to
    const channel = message.guild.channels.cache.find(ch => ch.name.includes("welcome")); //** This is telling the script which server to send teh message in**\\
    const serverName = message.guild.name
    const rulech = message.guild.channels.cache.find(ch => ch.name.includes("rules"));
    if (!channel) return;
    const blob1 = client.emojis.cache.find(em => em.name === "ablobwave");
    const blannk = client.emojis.cache.find(em => em.name === "Blank");
    //making embed
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(message.user.displayAvatarURL())
        .setTitle(`**${message.displayName} Joined**`)
        .addField(`Welcome to ${serverName} ${blob1}`, `Please read the Rules, hope you have a pleasant stay ${message.displayName}! Say ${config.prefix}verify to begin! ${message.displayName}`)
        .setFooter(`${serverName}`, blob1.url)
    const dmembed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(message.user.displayAvatarURL())
        .setTitle(`**Welcome ${message.displayName} to ${serverName}**`)
        .addField(`${blob1}`, `Please read the <#${rulech.id}>, hope you have a pleasant stay ${message.displayName}! Say ${config.prefix}verify to begin! ${message.displayName}`)
        .setFooter(`${serverName}`, blob1.url)
    // sends a message to the channel
    channel.send(embed)
    //}
})
client.on('guildMemberRemove', async (message) => { // this event gets triggered when a new member leaves the server!
    //if (message.guild && myGuilds.has(message.guild.id)) {
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    //making embed
    const channel = message.guild.channels.cache.find(ch => ch.name.includes("welcome")); //** This is telling the script which server to send teh message in**\\
    if (!channel) return;
    const serverName = message.guild.name
    const blob2 = client.emojis.cache.find(em => em.name === "ablobsigh");
    const rulech = message.guild.channels.cache.find(ch => ch.name.includes("rules"));
    let embede = new Discord.MessageEmbed()
        .setColor('RED')
        .setThumbnail(message.user.displayAvatarURL())
        .setTitle('A member left the server')
        .setDescription(`**${message.displayName}** has left ${serverName}, we now have ${message.guild.memberCount} members!`)
        .setFooter(`${serverName}`, blob2.url)
    // sends a message to the channel
    channel.send(embede)
    //}
})
client.login(config.token);
//client.user.setActivity(',help');