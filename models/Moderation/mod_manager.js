const Discord = require('discord.js');
const mute = require('./mute');
const usersc = require('./user');

/**
 * Mute a member
 * @param {Discord.GuildMember} member 
 */
module.exports.mute = async (member, time) => {
    let saved = true
    new mute({
        GUILD: member.guild.id,
        USER: member.id,
        ROLES: member.roles.cache.map(r => r.id),
        TIME: Date.now() + time || null
    }).save().catch(e => console.log(e), saved = false);
    let role = member.guild.roles.cache.find(r => r.name === 'Mute')
    if(!role){
        role = member.guild.roles.create({
            name: 'Mute',
            reason: `${member.client.user.username} Mute Role.`,
            permissions: [],
        });
    }
    member.roles.cache.forEach(mr => {
        member.roles.remove(mr).catch(( )=>{ })
    })
    member.roles.add(role);
    member.guild.channels.cache.forEach(async (channel, id) => {
        await channel.permissionOverwrites.edit(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          })
    });
    if(Number(time) && !isNaN(time)){
        setTimeout(async () => {
            const FIND = await mute.findOne({
                USER: member.id
            })
            if(!FIND) return
            if(FIND.TIME >= Date.now()){
                FIND.ROLES.forEach(r => {
                    member.roles.add(r).catch(( )=>{ })
                });
                member.roles.remove(role).catch(( )=>{ })
            }
        }, Number(time));
    }
    return {
        saved: saved,
        object: mute.findOne({ USER: member.id }),
        time: time||null
    }
}


module.exports.addI = async (user) => {
    const FIND_U = await usersc.findOne({
        USER: user
    });
    let saved
    if(FIND_U){
            await usersc.findOne({
                USER: user
            }, async (err, duser) => {
                if (err) console.log(err);
                if(typeof duser.I === 'string' && duser.I){
                duser.I += 1
                } else {
                    if(!duser.I){
                        duser.I = 1
                    }
                }
                await duser.save().catch(e => console.log(e), saved = false);
            })
    } else {
        new usersc({
            USER: user,
            I: 1
        }).save().catch(e => console.log(e), saved = false);
    }
    return {
        saved: saved,
        find: usersc.findOne({ USER: user })
    }
}
/**
 * 
 * @param {String} user 
 * @param {String} reason 
 * @param {String} guild
 */
module.exports.warnUser = async (user) => {
    this.addI(user);
}

module.exports.findUser = async (user) => {
    const FINd = await usersc.findOne({
        USER: user
    })

    let found = true
    if(!FINd) found = false
    
    return {
        object: FINd,
        found: found,
        is: FINd?.I||'0'
    }
}

module.exports.removeI = async (user) => {
    const FIND_U = await usersc.findOne({
        USER: user
    });
    let saved
    if(FIND_U){
            await usersc.findOne({
                USER: user
            }, async (err, duser) => {
                if (err) console.log(err);
                if(duser.I < 1){
                    duser.I = 0
                } else {
                duser.I -= 1
                }
                await duser.save().catch(e => console.log(e), saved = false);
            })
    } else {
        new usersc({
            USER: user,
            I: 0
        }).save().catch(e => console.log(e), saved = false);
    }
    return {
        saved: saved,
        find: usersc.findOne({ USER: user })
    }
}
