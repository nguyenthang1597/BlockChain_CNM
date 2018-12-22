const Transaction = require('../models/Transaction');
const convertTxToPost = require('../lib/api/convertTxToPost');
const getSequence = require('../lib/api/getSequence');
const broadcastTx = require('../lib/api/broadcastTx');
const getMoney = require('../lib/api/getMoney')
const bandwith = require('../lib/api/bandwith')
const base64Img = require('base64-img');
const fs = require('fs');
var BASE64_MARKER = ';base64,';
const getFolowing = require('../lib/api/getFolowing')
const GetByAddress = async (req, res) => {
  console.log(req.query);
  let page = req.query.page || 1;
  let perpage = req.query.perpage || 10;
  let _page = parseInt(page, 10);
  let _perpage = parseInt(perpage, 10);
  let address = req.params.address;
  try {
    let rows = await Transaction.find({$or: [{"Address": address},{"Params.address": address}]}).limit(_perpage).skip((_page -1) * _perpage);
    let total = await Transaction.find({$or: [{"Address": address},{"Params.address": address}]}).count();
    let pages = Math.floor((total + _perpage) / _perpage);
    rows = rows.map(i => convertTxToPost(address, i));
    return res.send({
      page: _page,
      perpage: _perpage,
      total: total,
      pages,
      data: rows
    })
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}

const CountMoney = async (req, res) => {
  let address = req.params.address;
  if(address){
    try {
      let total = await getMoney(address)
      return res.send({Balance: total});
    } catch (e) {
      console.log(e);
      return res.status(400).end();
    }
  }
  else{
    return res.status(400).end();
  }
}

const GetSequence = async (req, res) => {
  let address = req.params.address;
  try {
    let sequence = await getSequence(address);
    return res.send({
      sequence: sequence
    })
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}

const GetAvatar = async (req, res) => {
  try {
    let rows = await Transaction.find({Address: req.params.address, Operation: 'update_account', "Params.key": 'picture'}).sort({Time: -1}).limit(1);
    let avatar = rows[0].Params.value;
    return res.json({
      Avatar: avatar,
      Marker: BASE64_MARKER
    })
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  } finally {

  }


}

const GetName = async (req, res) => {
  try {
    let rows = await Transaction.find({Address: req.params.address, Operation: 'update_account', "Params.key": 'name'}).sort({Time: -1}).limit(1);
    return res.json({
      Name: rows[0].Params.value
    })
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  } finally {

  }
}

const UpdateName = async (req, res) => {
  if(!req.body.name || !req.body.secret){
    return res.status(400).end();
  }
  let sequence = await getSequence(req.params.address);
  let params = {
    key: 'name',
    value: req.body.name
  }

  return broadcastTx(req.params.address, 'update_account', params, req.body.secret)
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

const UpdateAvatar = async (req, res) => {
  console.log(req.file);
  if(!req.file || (req.file.size/1024) > 20 || !req.body.secret)
    return res.status(400).end();

  var data = base64Img.base64Sync(req.file.path);
  let sequence = await getSequence(req.params.address);
  let params = {
    key: 'picture',
    value: data
  }
  fs.unlinkSync(req.file.path);
  return broadcastTx(req.params.address, 'update_account', params, req.body.secret)
    .then(response => {
        console.log(response);
        if(response.log === '')
          return res.json({
            Success: true
          })
        else return res.status(400).json({
          Success: false
        })
    }).catch(e => {
      console.log(e);
      return res.status(400).json({
        Success: false
      })
    })

}

const Bandwith = async (req,res) => {
  let address = req.params.address;
  try {
    let energy = await bandwith(address);
    return res.send({
      Bandwith: energy
    })
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }

}

const FollowUser = async (req, res) => {
  if(!req.body.following || !req.body.secret){
    return res.status(400).end();
  }
  let following = await getFolowing(req.params.address)
  following=following.concat(req.body.following)
  console.log(following)
  let params = {
    key: 'followings',
    value: {
      addresses: following
    }
  }
  return broadcastTx(req.params.address, 'update_account', params, req.body.secret)
  .then(response => {
      console.log(response)
      if(response.log === '')
        return res.json({
          Success: true
        })
      else return res.status(400).json({
        Success: false
      })
  }).catch(e => {
    console.log("E",e)
    return res.status(400).json({
      Success: false
    })
  })
}
const GetFollowing = async (req,res) => {
  try {
    let following = await getFollowing(req.params.address)
    console.log(following)
    return res.json({'Following':following})
  }catch(e){
    return res.status(400).end();
  }
}

module.exports = {
  GetByAddress,
  CountMoney,
  GetSequence,
  UpdateName,
  UpdateAvatar,
  GetAvatar,
  GetName,
  Bandwith,
  GetEnergy,
  FollowUser,
  GetFollowing
}
