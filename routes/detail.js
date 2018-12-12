const router = require('express').Router();
const GetByAddress = require('../controllers/GetByAddress')
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

module.exports = router;
