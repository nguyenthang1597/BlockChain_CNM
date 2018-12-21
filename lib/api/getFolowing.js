const Transaction = require('../../models/Transaction');

const getFolowing = async (address) => {
  let rows = await Transaction.find({Address: address, Operation: 'update_account',"Params.key": 'followings'}).sort({Time:-1}).limit(1);
    if (rows.length===0)
        return null
  return rows[0].Params.value;
}

module.exports = getFolowing;

