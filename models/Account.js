const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BANDWIDTH_PERIOD = 86400;
const Account = new Schema({
  Address: String,
  Bandwidth: {type: Number, default: BANDWIDTH_PERIOD},
  BandwidthTime: Date,
  Energy: {type: Number, default: 0}
})

module.exports = mongoose.model('Account', Account);
