const Transaction = require('../models/Transaction');
const convertTxToPost = require('../lib/api/convertTxToPost');
const GetByAddress = async (req, res) => {
  let page = req.query.page || 1;
  let perpage = req.query.perpage || 10;
  let _page = parseInt(page, 10);
  let _perpage = parseInt(perpage, 10);
  let address = req.params.address;
  try {
    let rows = await Transaction.find({$or: [{"Address": address},{"Params.address": address}]}).limit(_perpage).skip((_page -1) * _perpage);
    let total = await Transaction.find({$or: [{"Address": address},{"Params.address": address}]}).count();
    let pages = Math.floor((total + _perpage) / _perpage);
    rows = rows.map(i => convertTxToPost(address, i));
    return res.send({
      page: _page,
      perpage: _perpage,
      total: total,
      pages,
      data: rows
    })
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}

const CountMoney = async (req, res) => {
  let address = req.params.address;
  if(address){
    try {
      let rows = await Transaction.find({$or: [{"Address":address},{"Params.address":address}]})
      rows = rows.map(i => convertTxToPost(address, i));
      let total = 0;
      rows.map(i=>{
          if (i.Method === 'ReceivePayment')
              total+= i.Content.Amount;
          if (i.Method === 'SendPayment')
              total-= i.Content.Amount;
      })
      return res.send({total: total});
    } catch (e) {
      console.log(e);
      return res.status(400).end();
    }
  }
  else{
    return res.status(400).end();
  }
}

const GetSequence = async (req, res) => {
  let address = req.params.address;
  try {
    let sequence = await Transaction.find({"Address":address}).sort({Sequence:-1}).limit(1)
    return res.send({
      sequence: sequence[0].Sequence
    })
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}

module.exports = {
  GetByAddress,
  CountMoney,
  GetSequence
}
