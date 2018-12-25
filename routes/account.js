const router = require('express').Router();
const {getAccounts} = require('../controllers/Account')
router.get('/list', getAccounts);


module.exports = router;
