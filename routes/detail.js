const router = require('express').Router();
const upload = require('../config/multer')
const {GetByAddress, CountMoney, GetSequence, UpdateName, UpdateAvatar, GetAvatar, GetName,Bandwith} = require('../controllers/Detail');






router.get('/:address/list', GetByAddress);
router.get('/:address/balance', CountMoney);
router.get('/:address/sequence', GetSequence)
router.get('/:address/avatar', GetAvatar)
router.get('/:address/name', GetName)
router.get('/:address/bandwith', Bandwith)


//update

router.put('/:address/name', UpdateName);
router.put('/:address/avatar', upload.single('avatar'),UpdateAvatar);
module.exports = router;
