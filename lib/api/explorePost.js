const Transaction = require('../../models/Transaction');
const getFollowing = require('./getFollowing')
const explorePost = async (address, page = 1, perpage = 10) => {
  let following = await getFollowing(address);
  following.push(address);
  console.log(following);
  let rows = await Transaction.find({$or: [
    {Address: {$in: following}, 'Params.key':{$ne: 'followings'}, $and: [{Operation: {$ne: 'interact'}}, {Operation: {$ne: 'create_account'}}]},
    {'Params.address': {$in: following}, 'Params.key':{$ne: 'followings'}, $and: [{Operation: {$ne: 'interact'}}, {Operation: {$ne: 'create_account'}}]}
  ]})
    .sort({Time: -1})
    .limit(perpage)
    .skip((page - 1) * perpage)
  if(!rows)
    return [];
  return rows;
}

module.exports = explorePost;
