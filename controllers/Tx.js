
const getSequence = require('../lib/api/getSequence');
const {encode, getUnsignedHash} = require('../lib/transaction')
const broadcastTx = require('../lib/api/broadcastTx')
const UnSignedHash = async (req, res) => {
  if (!req.body.account || !req.body.params || !req.body.operation)
    return res.status(400).end();
  let sequence = await getSequence(req.body.account);
  let tx = {
    version: 1,
    account: req.body.account,
    sequence: sequence,
    memo: Buffer.alloc(0),
    operation: req.body.operation,
    params: req.body.params,
    signature: Buffer.alloc(64, 0)
  }
  try {
    let UnsignedHash = getUnsignedHash(tx);
    return res.json({
      UnsignedHash,
      tx
    })
  } catch (error) {
    return res.status(400).end();
  }
}
const SendTx = async (req, res) => {
  let tx = req.body.tx;
  tx.memo = new Buffer(tx.memo.data)
  tx.signature = new Buffer(tx.signature.data);
  let _encode = encode(tx);
  let txString = _encode.toString('base64');
  return broadcastTx(txString)
  .then(response => {
    if(response.log === ''){
      return res.json({
        Success: true
      })
    }
    else {
      return res.status(400).json({
        Success: false,
        Message: response.log
      })
    }
  })
  .catch(e => {
    return res.status(400).json({
      Success: false,
      Message: e.message
    })
  })
}
module.exports = {
  UnSignedHash,
  SendTx
}