const Transaction = require('../models/Transaction');
const {sign, encode} = require('../lib/transaction')
const rpc = require('../config/rpc');
const getSequence = require('../lib/api/getSequence');
const broadcastTx = require('../lib/api/broadcastTx');
const PostPayment = async (req, res) => {
  if(!req.body.address || !req.body.to || !req.body.amount || !req.body.secret){
    return res.status(400).end();
  }
  let params = {
    address: req.body.to,
    amount: parseInt(req.body.amount, 10)
  }
  return broadcastTx(req.body.address, 'payment', params, req.body.secret)
  .then(response => {
      if(response.log === '')
        return res.json({
          Success: true
        })
      else return res.status(400).json({
        Success: false
      })
  }).catch(e => {
    return res.status(400).json({
      Success: false
    })
  })
}


module.exports = {
  PostPayment
}
