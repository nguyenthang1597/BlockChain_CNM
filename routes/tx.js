const router = require('express').Router();
const {UnSignedHash, SendTx} = require('../controllers/Tx')
router.post('/unsignedhash', UnSignedHash)
router.post('/sendtx',SendTx)
module.exports = router;