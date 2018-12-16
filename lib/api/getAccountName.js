const Transaction = require('../../models/Transaction')
module.exports = async function(address){
  let query = await Transaction.find({"Address":address, Operation: 'update_account', "Params.key": 'name'}).sort({Time:-1}).limit(1);
  if(query.length === 0)
    return "";
  return query[0].Params.value;

}
