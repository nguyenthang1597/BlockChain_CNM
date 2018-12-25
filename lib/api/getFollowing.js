const Account = require('../../models/Account')
const getFollowing = async (address) => {
  let rows = await Account.findOne({Address: address})
  if(!rows)
    return []
  return rows.Following;
}

module.exports = getFollowing;
