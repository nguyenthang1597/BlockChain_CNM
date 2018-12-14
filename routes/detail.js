const router = require('express').Router();
const {GetByAddress, CountMoney, GetSequence} = require('../controllers/Detail');

router.get('/:address/list', GetByAddress);
router.get('/:address/total', CountMoney);
router.get('/:address/sequence', GetSequence)

module.exports = router;
