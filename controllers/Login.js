const Transaction = require('../models/Transaction');
const Login = async (req, res) => {
  let address = req.body.publickey;
  let row = await Transaction.findOne({$or: [{Address: address}, {'Params.address': address}]});
  if(row)
    return res.status(200).json({
      Success: true,
      PublicKey: address
    })
  return res.status(401).end();
}

module.exports = {
  Login
}
