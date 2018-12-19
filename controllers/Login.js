const Transaction = require('../models/Transaction');

const Login = async (req, res) => {
  let {PublicKey} = req.body;
  let rows = await Transaction.find({$or: [{Address: PublicKey}, {Operation: 'create_account', "Params.address": PublicKey}]});
  if(rows){
    res.json({
      Success: true
    })
  }
  else
    res.status(401).json({
      Success: false
    })
}

module.exports = {
  Login
};
