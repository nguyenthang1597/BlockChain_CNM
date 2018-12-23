const rpc = require('../../config/rpc');
module.exports = async function (txString){
  return rpc.broadcastTxSync({tx: `${txString}`});
}
