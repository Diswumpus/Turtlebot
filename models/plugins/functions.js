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