const rpc = require('../../config/rpc');
const getSequence = require('./getSequence');
const bandwith = require('./bandwith')
const {encode, sign} = require('../transaction')
module.exports = async function (address, operation, params, secret){
  let sequence = await getSequence(address);
  let tx = {
    version: 1,
    account: address,
    sequence: sequence,
    memo: Buffer.alloc(0),
    operation,
    params,
    signature: Buffer.alloc(64,0)
  }
  sign(tx, secret);
  let _encode = encode(tx);
  let txString = _encode.toString('base64');
  return rpc.broadcastTxSync({tx: `${txString}`});
}
