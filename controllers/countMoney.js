const Transaction = require('../models/Transaction')
const convertTxToPost = require('../lib/api/convertTxToPost')

const countMoney = async (address)=>{
    let rows = await Transaction.find({$or: [{"Address":address},{"Params.address":address}]})
    rows = rows.map(i => convertTxToPost(address, i));
    let total = 0;
    rows.map(i=>{
        if (i.Method === 'ReceivePayment')
            total+= i.Content.Amount;
        if (i.Method === 'SendPayment')
            total-= i.Content.Amount; 
    })
    return total
}
module.exports = countMoney;