const getSequence = require('../lib/api/getSequence')
const broadcastTx = require('../lib/api/broadcastTx');
const explorePost = require('../lib/api/explorePost');
const Transaction = require('../models/Transaction')
const Post = async (req, res) => {
  if(!req.body.address || !req.body.text || !req.body.secret){
    return res.status(400).end();
  }
  let type = req.body.type ? parseInt(req.body.type, 10) : 1;
  let params = {
    content: {
      type: parseInt(type, 10),
      text: req.body.text
    },
    keys: []
  }

  return broadcastTx(req.body.address, 'post', params, req.body.secret)
  .then(response => {
      if(response.log === '')
        return res.json({
          Success: true
        })
      else return res.status(400).json({
        Success: false
      })
  }).catch(e => {
    return res.status(400).json({
      Success: false
    })
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
const GetComment = async (req, res) => {
  try {
    let comment = await Transaction.find({Address:req.params.address,Operation:'interact','Params.content.type':1,'Params.object':req.params.object})
    return res.json({
      comment: comment
    })
  }catch(e){
    return  res.status(400).end()
  }
}
const GetReaction = async (req, res) => {
  try {
    let react = await Transaction.find({Address:req.params.address,Operation:'interact','Params.content.type':2,'Params.object':req.params.object})
    return res.json({
      Reaction: react
    })
  }catch(e){
    return  res.status(400).end()
  }
}
const PostReaction = async (req, res) => {
  if(!req.body.address || !req.body.reaction || !req.body.secret){
    return res.status(400).end();
  }
  let params = {
    object: req.params.object, 
    content: {
      type: 2,
      reaction: req.body.reaction
    }
  }
  return broadcastTx(req.body.address, 'interact', params, req.body.secret)
  .then(response => {
      if(response.log === '')
        return res.json({
          Success: true
        })
      else return res.status(400).json({
        Success: false
      })
  }).catch(e => {
    return res.status(400).json({
      Success: false
    })
  })
}
const PostComment = async (req, res) => {
  if(!req.body.address || !req.body.text || !req.body.secret){
    return res.status(400).end();
  }
  let params = {
    object: req.params.object, 
    content: {
      type: 1,
      text: req.body.text
    }
  }
  return broadcastTx(req.body.address, 'interact', params, req.body.secret)
  .then(response => {
      if(response.log === '')
        return res.json({
          Success: true
        })
      else return res.status(400).json({
        Success: false
      })
  }).catch(e => {
    return res.status(400).json({
      Success: false
    })
  })
}
module.exports = {
  Post,
  Explore,
  GetComment,
  GetReaction,
  PostReaction,
  PostComment
}
