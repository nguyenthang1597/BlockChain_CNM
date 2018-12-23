const getSequence = require('../lib/api/getSequence')
const broadcastTx = require('../lib/api/broadcastTx');
const explorePost = require('../lib/api/explorePost');

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

module.exports = {
  Post,
  Explore
}
