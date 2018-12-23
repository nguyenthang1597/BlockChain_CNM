const Transaction = require('../../models/Transaction')
module.exports = async function(address){
    let rows = await Transaction.find({Operation: 'payment', $or: [{Address: address}, {'Params.address': address}]})
    let total = 0;
    rows.forEach(e => e.Address === address ? total -= e.Params.amount : total += e.Params.amount)
    return total
}
