const router = require('express').Router();
const {PostPayment} = require('../controllers/Payment');
router.post('/', PostPayment);


module.exports = router;
