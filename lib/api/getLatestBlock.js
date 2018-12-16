const Transaction = require('../../models/Transaction');
module.exports = async function(address){
  let query = await Transaction.find().sort({Block:-1}).limit(1);
  if(query.length === 0)
    return 0;
  return query[0].Block;
}
