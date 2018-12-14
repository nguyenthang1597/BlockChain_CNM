const Transaction = require('../models/Transaction');
const convertTxToPost = require('../lib/api/convertTxToPost')
const GetByAddress = async (address, page, perpage) => {
  let _page = parseInt(page, 10);
  let _perpage = parseInt(perpage, 10);
  let rows = await Transaction.find({$or: [{"Address": address},{"Params.address": address}]}).limit(_perpage).skip((_page -1) * _perpage);
  console.log(rows);
  rows = rows.map(i => convertTxToPost(address, i));
  console.log(rows);
  return rows;
}

module.exports = GetByAddress;
