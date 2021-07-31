/*

  _      ________      ________ _       _____ 
 | |    |  ____\ \    / /  ____| |     / ____|
 | |    | |__   \ \  / /| |__  | |    | (___  
 | |    |  __|   \ \/ / |  __| | |     \___ \ 
 | |____| |____   \  /  | |____| |____ ____) |
 |______|______|   \/   |______|______|_____/ 
                                              
                                              

*/

const Discord = require('discord.js');
const RANK_CARDS = require('./rank-card');

module.exports.RANK_EDIT = async (url, guild) => {
    const RANK_FIND = await RANK_CARDS.findOne({
        GUILD: guild
    })
    if (!RANK_FIND) {
        new RANK_CARDS({
            GUILD: guild,
            URL: url
        }).save().catch(e => console.log(e));
        return {
            found: true,
            method: 'NEW',
            obj: RANK_CARDS.findOne({
                GUILD: guild
            })
        }
    } else {
        RANK_CARDS.findOne({
            GUILD: guild
        }, async (err, dUser) => {
            if (err) console.log(err);
            dUser.URL = url
            await dUser.save().catch(e => console.log(e));
        });
        return {
            found: true,
            method: 'EDIT',
            obj: RANK_CARDS.findOne({
                GUILD: guild
            })
        }
    }
}
module.exports.RANK_FIND = async (guild) => {
    const res = await RANK_CARDS.findOne({
        GUILD: guild
    });
    let resf
    if(res) resf = true
    else resf = false
    return {
        res: res,
        found: resf
    }
}
module.exports.RANK_REMOVE = async (guild) => {
    const RANK_CARDS = require('./rank-card');
    await RANK_CARDS.findOneAndDelete({
        GUILD: guild
    }).catch(( )=>{ })
}

/*

  ____ _____ _____ _______ _    _ _____      __     _______ 
 |  _ \_   _|  __ \__   __| |  | |  __ \   /\\ \   / / ____|
 | |_) || | | |__) | | |  | |__| | |  | | /  \\ \_/ / (___  
 |  _ < | | |  _  /  | |  |  __  | |  | |/ /\ \\   / \___ \ 
 | |_) || |_| | \ \  | |  | |  | | |__| / ____ \| |  ____) |
 |____/_____|_|  \_\ |_|  |_|  |_|_____/_/    \_\_| |_____/ 
                                                            
                                                            
 */

 /*
     GUILD: String,
    USER: String,
    DATE: Date|String,
    */
 const birthdays = require('./birthdays');


 module.exports.setChannel = async (channel) => {
     
 }
 /**
 * 
 * @param {Discord.GuildMember} member 
 * @param {Date|String} date
 */
 module.exports.addDay = async (member, date) => {
    new birthdays({
        GUILD: member.guild.id,
        USER: member.id,
        DATE: new Date(date.toString() + new Date().getFullYear().toString()),
        DATE2: new Date(date.toString() + new Date().getFullYear().toString()).getTime().toString()
    }).save().catch(e => console.log(e));
 }
/**
 * Remove a birthday.
 * @param {Discord.GuildMember} member 
 */
 module.exports.removeDay = async (member) => {
    await birthdays.findOneAndDelete({ GUILD: member.guild.id, USER: member.id });
 }

 /**
  * Get a list of birthdays for a guild.
  * @param {String} guild 
  * @returns A list of birthdays
  */
 module.exports.listDays = async (guild) => {
    return birthdays.find({ GUILD: guild})
 }

 
 /**
  * 
  * @param {Discord.GuildMember} member 
  * @returns A birthday model
  */
 module.exports.getDay = async (member) => {
    return birthdays.findOne({ GUILD: member.guild.id, USER: member.id })
 }

 /*
 
           ______ _  __
     /\   |  ____| |/ /
    /  \  | |__  | ' / 
   / /\ \ |  __| |  <  
  / ____ \| |    | . \ 
 /_/    \_\_|    |_|\_\
                       
                       
*/
const afk = require('../AFK/afk');

/**
 * 
 * @param {Discord.GuildMember} user 
 * @param {String} reason 
 */
module.exports.addAFK = (user, reason) => {
    user.setNickname(`[AFK] ${user.nickname||user.user.username}`, `${user.client.user.username} AFK`).catch(( )=>{ })
    new afk({
        GUILD: user.guild.id,
        USER: user.id,
        R: reason||null
    }).save().catch(e => console.log(e));
}
/**
 * 
 * @param {Discord.GuildMember} user 
 */
module.exports.rmAFK = (user) => {
    user.setNickname(`${user.nickname||user.user.username}`, `${user.client.user.username} AFK`).catch(( )=>{ })
    afk.findOneAndDelete({
        USER: user.id,
        GUILD: user.guild.id
    });
}

/**
 * 
 * @param {Discord.GuildMember} member 
 * @returns 
 */
module.exports.isAFK = async (member) => {
    let found = true
    const iafk = await afk.findOne({
        GUILD: member?.guild?.id,
        USER: member?.id
    })
    if(!member) throw new TypeError(`Missing argument member!`)
    if(!iafk) found = false

    return found
}

/**
 * 
 * @param {Discord.GuildMember} member 
 */
module.exports.getAFK = async (member) => {
    const data = await afk.findOne({
        USER: member?.id,
        GUILD: member?.guild?.id
    })
    return data
}

 /*
 
   ____ _______ _    _ ______ _____  
  / __ \__   __| |  | |  ____|  __ \ 
 | |  | | | |  | |__| | |__  | |__) |
 | |  | | | |  |  __  |  __| |  _  / 
 | |__| | | |  | |  | | |____| | \ \ 
  \____/  |_|  |_|  |_|______|_|  \_\
                                     
                                     

  */
    const messages = require('./guildMessages');
  module.exports.addMessages = async (member) => {
      /*
          GUILD: String,
    USER: String,
    MESSAGES: Number
    */
   const FIND_check = await messages.findOne({
       GUILD: member.guild.id,
       USER: member.user.id
   });
   if(!FIND_check){
       new messages({
        GUILD: member.guild.id,
        USER: member.user.id,
        MESSAGES: 1
       }).save().catch(e => console.log(e));
   } else {
    messages.findOne({
        GUILD: member.guild.id,
        USER: member.user.id
    }, async (err, dUser) => {
        if (err) console.log(err);
        dUser.MESSAGES++
        await dUser.save().catch(e => console.log(e));
    }); 
   }
  }
  module.exports.getMessages = async (member) => {
      const data = await messages.findOne({ GUILD: member.guild.id, USER: member.user.id });
      if(!data) return null
      return data;
  }