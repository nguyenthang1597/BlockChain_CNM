const Account = require('../../models/Account')
const getFollower = async (address) => {
  let rows = await Account.find({Following: {$all: [address]}})
  if(!rows)
    return [];
  rows = rows.map(row => row.Address);
  return rows;
}

module.exports = getFollower;
