const rpc = require('../../config/rpc');
const {decode} = require('../transaction/index')
const Transaction = require('../../models/Transaction');
const getLatestBlock = require('./getLatestBlock');
let i = 1;
let height;
rpc.subscribe({query: "tm.event = 'NewBlock'"}, async (e) => {
  let latesBlock = await getLatestBlock();
  i = latesBlock + 1;
  height = e.block.header.height;
  while(i < height){
    let block = await rpc.block({height: i});
    if(block.block.data.txs){
      let _decode = block.block.data.txs.map(tx => decode(Buffer.from(tx, 'base64')));
      let trans = _decode.map(dc => ({
        Address: dc.account,
        Sequence: dc.sequence,
        Operation: dc.operation,
        Params: dc.params,
        Time: block.block_meta.header.time,
        Block: parseInt(block.block.header.height, 10)
      }))

      trans.forEach( async e =>  {
        try {
            await Transaction.findOneAndUpdate({Address: e.Address, Sequence: e.Sequence}, e, {upsert: true});
            console.log('Them thanh cong block:',e.Block);
        } catch (e) {
            console.log(e);
            return;
        } finally {

        }
      })
    }
    i++;
  }
}).catch(e => console.log(e))
