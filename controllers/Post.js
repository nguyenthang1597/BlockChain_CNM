const Transaction = require('../models/Transaction');
const {sign, encode} = require('../lib/transaction')
const rpc = require('../config/rpc');
const getSequence = require('../lib/api/getSequence')
const broadcastTx = require('../lib/api/broadcastTx');
const Post = async (req, res) => {
  if(!req.body.address || !req.body.text || !req.body.secret){
    return res.status(400).end();
  }
  let type = req.body.type ? parseInt(req.body.type, 10) : 1;
  let sequence = await getSequence(req.body.address);
  let params = {
    content: {
      type: parseInt(type, 10),
      text: req.body.text
    },
    keys: []
  }

  return broadcastTx(req.body.address, 'post', params, req.body.secret)
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
  Post
}
