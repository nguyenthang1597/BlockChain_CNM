const Account = require('../../models/Account')
module.exports = async (address,value) => {
    return Account.findOneAndUpdate({Address:address},{Following:value})
}