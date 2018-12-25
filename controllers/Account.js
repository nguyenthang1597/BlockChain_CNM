const Account = require('../models/Account');

const getAccounts = async (req,res) => {
  let rows = await Account.find({}).select('Address');
  return res.json({
    Accounts: rows
  })
}

module.exports = {
  getAccounts
}
