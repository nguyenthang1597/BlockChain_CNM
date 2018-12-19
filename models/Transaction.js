const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
  Address: String,
  Operation: String,
  Sequence: Number,
  Params: Schema.Types.Mixed,
  Time: Date,
  Block: Number,
  Size: Number
})

module.exports = mongoose.model('Transaction', Transaction);
