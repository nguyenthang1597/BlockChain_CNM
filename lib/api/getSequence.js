const Transaction = require('../../models/Transaction')
module.exports = async function(address){
  let query = await Transaction.find({"Address":address}).sort({Sequence:-1}).limit(1);
  if (query.length === 0)
    return 1
  return query[0].Sequence + 1;
}
