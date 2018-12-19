const Transaction = require('../models/Transaction');
const base32 = require('base32.js');
const {Keypair} = require('stellar-base')
const Login = async (req, res) => {

  let {PublicKey, SecretKey} = req.body;
  try {
    if(Keypair.fromSecret(SecretKey)._publicKey.toString() !== Keypair.fromPublicKey(PublicKey)._publicKey.toString()){
      return res.status(401).end();
    }
  } catch (e) {
      return res.status(401).end();
  } finally {

  }

  let rows = await Transaction.find({$or: [{Address: PublicKey}, {Operation: 'create_account', "Params.address": PublicKey}]});
  if(rows.length){
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
