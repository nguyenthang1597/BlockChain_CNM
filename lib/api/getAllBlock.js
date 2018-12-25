const rpc = require('../../config/rpc');
const {decode} = require('../transaction/index')
const Transaction = require('../../models/Transaction');
const getLatestBlock = require('./getLatestBlock');
const updateBandwidth = require('./updateBandwidth')
const updateFollowing = require('./updateFollowing')
let i = 1;
let height;
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
              await updateBandwidth(e.Address, block);
              if (e.Params.key === 'followings'){
                await updateFollowing(e.Address,e.Params.value)
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
      io.on('connect', (socket) => {
        socket.broadcast.emit('broadcast', 'new block')
      })
    }
    i++;
  }
}).catch(e => console.log(e))
