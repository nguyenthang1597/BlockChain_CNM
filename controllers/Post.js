const getSequence = require('../lib/api/getSequence')
const broadcastTx = require('../lib/api/broadcastTx');
const explorePost = require('../lib/api/explorePost');
const Transaction = require('../models/Transaction')
const {getComment, getReaction} = require('../lib/api/getAboutPost')
const GetCommentAndReaction = async(req, res) => {
  let hash = req.params.hash;
  let result = await Promise.all([getComment(hash), getReaction(hash)]);
  let comments = result[0];
  let reactions = result[1];
  return res.json({
    comments,
    reactions
  })
}



const Explore = async (req, res) => {
  let page = parseInt(req.query.page || 1);
  let perpage = parseInt(req.query.perpage || 10)
  try {
    let explore = await explorePost(req.params.address, page, perpage);
    return res.json({
      Post: explore
    })
  } catch (error) {
    console.log(error);
    
    return res.status(400).end();
  }
}

module.exports = {
  Explore,
  GetCommentAndReaction
}
