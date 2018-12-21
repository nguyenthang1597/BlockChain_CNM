const Account = require('../../models/Account')
const getFolowing = require('./getFolowing')
const updateFollowing = async (address) => {
    let res = await Promise.all([getFolowing(address), Account.findOne({
        Address: address
    })])
    let following = res[0];
    let account = res[1];
    account.Following = following
    await Account.findOneAndUpdate({Address: account.Address}, account, {upsert: true});
}

module.exports = updateFollowing;
