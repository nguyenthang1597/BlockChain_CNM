const Account = require('../../models/Account')
const getFolowing = async (address) => {
  let rows = await Account.findOne({Address: address})
  return rows.Following;
}

module.exports = getFolowing;

