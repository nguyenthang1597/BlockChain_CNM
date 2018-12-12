const router = require('express').Router();
const GetByAddress = require('../controllers/GetByAddress')
const coutMoney = require('../controllers/countMoney')
const getSequence = require('../controllers/getSequence')
router.get('/:address/list', async (req, res) => {
  let page = req.query.page || 1;
  let perpage = req.query.perpage || 20;
  try {
      let rows = await GetByAddress(req.params.address, page ,perpage);
      return res.json({
        Page: page,
        Perpage: perpage,
        Data: rows
      })
  } catch (e) {
    console.log(e);
    res.status = 400;
    res.end();
  }
})
router.get('/:address/total',async (req,res)=>{
  try {
    let total = await coutMoney(req.params.address)
    return res.json({
      Total: total
    })
  } catch (e) {
    res.status(400);
    res.end();
  }
})
router.get('/:address/sequence',async (req,res)=>{
  try {
    let sequence = await getSequence(req.params.address)
    return res.json({
      Sequence: sequence
    })
  } catch (e) {
    res.status(400);
    res.end();
  }
})
module.exports = router;
