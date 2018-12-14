const Transaction = require('../models/Transaction')
const convertTxToPost = require('../lib/api/convertTxToPost')

const getSequence = async (address)=>{
    let sequence = await Transaction.find({$or: [{"Address":address},{"Params.address":address}]}).sort({Sequence:-1}).limit(1)
    return sequence[0].Sequence
}
module.exports = getSequence;