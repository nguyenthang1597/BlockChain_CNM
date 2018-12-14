var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const {decode} = require('../lib/transaction')



router.get('/', function(req, res, next) {
  res.status(200).send('OK');
});

router.post('/login', async (req, res, next) => {
  if(!req.body.Address)
    return res.status(401);
    try {
        let result = await fetch(`https://komodo.forest.network/tx_search?query="account='${req.body.Address}'"`);
        if(result.status !== 200)
          return res.status(401).end();
        let data = await result.json();
        let txs = data.result.txs.map(i => i.tx);
        let transactions = txs.map(tx => decode(Buffer.from(tx, 'base64')));

        return res.send(transactions)
    } catch (e) {
      return res.staus(401).end();
    }
})

module.exports = router;
