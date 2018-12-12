let fetch = require('node-fetch');
const {decode} = require('./lib/transaction')
const Transaction = require('./models/Transaction')
require('./config/mongoose')
const fetchByPage = async (totalTxs) => {
  let txs = [];
  let pages = totalTxs % 30 > 0 ? Math.round(totalTxs/30) + 1 : Math.round(totalTxs/30);
  let arr = []
  for(let page = 0; page<pages;page++){
    arr.push(fetch(`https://komodo.forest.network/tx_search?query=%22account=%27GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI%27%22&page=${page + 1}&per_page=30`))
  }

  Promise.all(arr)
  .then(res => Promise.all(res.map(i => i.json())))
  .then(data => {
    for(let i = 0; i<data.length;i++){
      txs = txs.concat(data[i].result.txs)
    }
    txs.forEach(e => {

      let _decode = decode(Buffer.from(e.tx, 'base64'));
      console.log(_decode);
      let tran = new Transaction({
        Address: _decode.account,
        Operation: _decode.operation,
        Params: _decode.params,
        Time: null,
        Block: e.height
      })
      // tran.save();

    })
  })
}



fetch(`https://komodo.forest.network/tx_search?query=%22account=%27GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI%27%22`)
.then(res => res.json())
.then(data => {
  let totalTxs = data.result.total_count;
  fetchByPage(totalTxs)
})
