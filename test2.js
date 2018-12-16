const {encode, sign, decode} = require('./lib/transaction')
let tendermint = require('tendermint')
let rpcUrl = 'wss://komodo.forest.network:443'
let rpc = tendermint.RpcClient(rpcUrl)

rpc.block({height: 6626}).then(res => {
  let tx = res.block.data.txs[0];
  let _decode = decode(Buffer.from(tx, 'base64'))
  console.log(_decode);
});
