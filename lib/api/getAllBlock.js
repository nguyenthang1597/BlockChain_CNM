const rpc = require('../../config/rpc');
const {decode} = require('../transaction/index')
const Transaction = require('../../models/Transaction');
const getLatestBlock = require('./getLatestBlock');
const updateBandwidth = require('./updateBandwidth')
const updateFollowing = require('./updateFollowing')
const Account = require('../../models/Account')
const WebSocket = require('ws')
let i = 1;
let height;

const {wssPostInteract, wssUpdateAccount} = require('../../config/socket');

wssPostInteract.broadcast = function broadcast(data) {
  wssPostInteract.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wssPostInteract.on('connection', function(ws, req) {
  console.log(req.connection.remoteAddress)
})

rpc.subscribe({query: "tm.event = 'NewBlock'"}, async (e) => {
  let latesBlock = await getLatestBlock();
  i = latesBlock + 1;
  height = e.block.header.height;
  while(i < height){
    let block = await rpc.block({height: i});
    if(block.block.data.txs){
      try {
        let _decode = block.block.data.txs.map(tx => decode(Buffer.from(tx, 'base64')));
        let trans = _decode.map(dc => ({
          Address: dc.account,
          Sequence: dc.sequence,
          Operation: dc.operation,
          Params: dc.params,
          Time: block.block_meta.header.time,
          Block: parseInt(block.block.header.height, 10),
          Hash: block.block.header.data_hash
        }))

        trans.forEach( async e =>  {
          try {
              await Transaction.findOneAndUpdate({Address: e.Address, Sequence: e.Sequence}, e, {upsert: true});
              if(e.Operation === 'create_account'){
                let newAccount = new Account({
                  Address: e.Params.address
                })
                await newAccount.save();
              }
              
              await updateBandwidth(e.Address, block);
              if (e.Params.key === 'followings'){
                await updateFollowing(e.Address,e.Params.value)
              }
              if(e.Operation === 'post' || e.Operation === 'interact' || e.Operation === 'payment '){
                let str = JSON.stringify(e);
                wssPostInteract.broadcast(str)
              }
              
              console.log('Them thanh cong block:',e.Block);
          } catch (e) {
              console.log(e);
              return;
          }
        })
      } catch(e){
        console.log(e);
      }
      
    }
    i++;
  }
}).catch(e => console.log(e))
