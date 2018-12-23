const {MAX_BLOCK_SIZE, RESERVE_RATIO, BANDWIDTH_PERIOD, MAX_CELLULOSE, NETWORK_BANDWIDTH} = require('../../config/constant');
const Account = require('../../models/Account')
const getMoney = require('./getMoney')
const moment = require('moment');
const updateBandwidth = async (address, block) => {
  const txSize = Buffer.from(block.block.data.txs[0], 'base64').length;
  var account, newAccount;
  let res = await Promise.all([getMoney(address), Account.findOne({
    Address: address
  })])
  let balance = res[0];
  let _account = res[1];

  if(!_account){
    newAccount = new Account({
      Address: address,
      Bandwidth: 0,
      BandwidthTime: null,
      Energy: 0,
      Following: []
    })
    account = {
      Address: address,
      Bandwidth: 0,
      BandwidthTime: null,
      Energy: 0,
      Following: []
    }
    await newAccount.save();
  }
  else account = _account;

    const diff = account.BandwidthTime ? moment(block.block.header.time).unix() - moment(account.BandwidthTime).unix() :
      BANDWIDTH_PERIOD;

    account.Bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.Bandwidth + txSize);
    account.BandwidthTime = block.block.header.time;
    account.Energy = balance * NETWORK_BANDWIDTH / MAX_CELLULOSE - account.Bandwidth;
    await Account.findOneAndUpdate({Address: account.Address}, account, {upsert: true});

}

module.exports = updateBandwidth;
