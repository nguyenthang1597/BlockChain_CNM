const Transaction = require('../../models/Transaction');

const countMoney = async (address) => {
  let rows = await Transaction.find({$or: [{Address: address, Operation: 'payment'}, {Operation: 'payment', "Params.address": address}]});
  let count = 0;
  rows.forEach(e => {
    e.Address === address ? count-= e.Params.amount : count+= e.Params.amount;
  })
  return count;
}

module.exports = countMoney;
