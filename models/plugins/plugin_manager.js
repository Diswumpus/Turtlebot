const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const levels = require('./levels');

/**
 * Find a guilds plugins.
 * @param {'LEVELS'} pluginname 
 * @param {String} guild
 * @returns {String}
 */
module.exports.findPlugin = async (guild, pluginname) => {
    if(pluginname === 'LEVELS'){
        const FIND = await levels.findOne({
            GUILD: guild
        });
        if(FIND){
            return {
                found: true,
                object: FIND,
                JSON: JSON.stringify(FIND)
            }
        } else {
            return {
                found: false,
                object: null,
                JSON: null
            }
        }
    } else {
        return {
            found: false,
            error: 'No plugin name!',
            object: null,
            JSON: null
        }
    }
}

module.exports.removeChannel = async (guild, channel) => {
    const FIND_CHECK = await levels.findOne({
        GUILD: guild
    });
    if(FIND_CHECK){
    const FIND = await levels.findOne({
        GUILD: guild
    }, async (err, guildData) => {
        if (err) console.log(err);
        guildData.CHANNEL = null
        await guildData.save().catch(e => console.log(e), saved = false);
    })
} else {
    return {
        error: 'Not found!'
    }
}
}
/**
 * 
 * @param {String} guild 
 * @param {String|Object} channel 
 * @returns The new object
 */
module.exports.setChannel = async (guild, channel) => {
    const FIND_CHECK = await levels.findOne({
        GUILD: guild
    });
    let saved = true;
    if(FIND_CHECK){
    const FIND = await levels.findOne({
        GUILD: guild
    }, async (err, guildData) => {
        if (err) console.log(err);
        guildData.CHANNEL = channel
        await guildData.save().catch(e => console.log(e), saved = false);
    })
    } else {
        new levels({
            GUILD: guild,
            CHANNEL: channel
        }).save().catch(e => console.log(e), saved = false);
    }
    return {
        saved: saved,
        find: await levels.findOne({ GUILD: guild })
    }
}
/**
 * Edit a guilds plugins.
 * @param {'LEVELS'} plugin 
 * @param {String} guild
 * @param {Boolean} onoff
 */
module.exports.editPlugin = async (plugin, guild, onoff, message) => {
    if(plugin === 'LEVELS'){
        let saved = true
        const FIND_CHECK = await levels.findOne({
            GUILD: guild
        });
        if(FIND_CHECK){
        const FIND = await levels.findOne({
            GUILD: guild
        }, async (err, guildData) => {
            if (err) console.log(err);
            guildData.ENABLED = onoff
            if(message){
                guildData.LEVELMESSAGE = message.toString()
            }
            await guildData.save().catch(e => console.log(e), saved = false);
        })
        } else {
            new levels({
                GUILD: guild,
                ENABLED: onoff
            }).save().catch(e => console.log(e), saved = false);
        }
        return {
            saved: saved,
            find: await levels.findOne({ GUILD: guild })
        }
    }
}

/**
 * Edit a guilds level message.
 * @param {String} guild
 * @param {String} message
 */
module.exports.editMessage = async (guild, message) => {
        let saved = true
        const FIND_CHECK = await levels.findOne({
            GUILD: guild
        });
        if(FIND_CHECK){
        const FIND = await levels.findOne({
            GUILD: guild
        }, async (err, guildData) => {
            if (err) console.log(err);
            guildData.LEVELMESSAGE = message.toString()
            await guildData.save().catch(e => console.log(e), saved = false);
        })
        } else {
            new levels({
                GUILD: guild,
                LEVELMESSAGE: message.toString()
            }).save().catch(e => console.log(e), saved = false);
        }
        return {
            saved: saved,
            find: await levels.findOne({ GUILD: guild })
        }
}