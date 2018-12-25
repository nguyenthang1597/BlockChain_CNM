const Account = require('../models/Account');
const Login = async (req, res) => {
  let address = req.body.publickey;
  let row = await Account.findOne({Address: address});
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
