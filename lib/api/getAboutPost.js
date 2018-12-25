const Transaction = require('../../models/Transaction')

const getComment = async (hash) => {
  let rows = await Transaction.find({Operation: 'interact', 'Params.object': hash, 'Params.content.type': 1}).select('Params.content.text Address Time')
  return rows;
}

const getReaction = async (hash) => {
  let rows = await Transaction.aggregate([{$sort: {Time: 1}}, {$match: {Operation: 'interact', 'Params.object': hash, 'Params.content.type': 2}}, {$group: {_id: '$Address', Reaction: {$last: '$Params.content.reaction'}}}])
  return rows;
}


module.exports = {
  getComment,
  getReaction
};
