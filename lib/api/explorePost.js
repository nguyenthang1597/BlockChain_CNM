const Transaction = require('../../models/Transaction');
const getFollowing = require('./getFollowing')
const explorePost = async (address, page = 1, perpage = 10) => {
  let following = await getFollowing(address);
  following.push(address);
  let rows = await Transaction.find({$and: [
    {$or: [{Operation: 'payment'}, {Operation: 'update_account', "Params.key": 'name'}, {Operation: 'update_account', "Params.key": 'picture'}, {Operation: 'post'}]},
    {$or: [{Address: {$in: following}}, {"Params.address": {$in: following}}]}
   ]})
    .sort({Time: -1})
    .limit(perpage)
    .skip((page - 1) * perpage)
  if(!rows)
    return [];
  return rows;
}

module.exports = explorePost;
