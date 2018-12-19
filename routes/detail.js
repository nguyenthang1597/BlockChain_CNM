const router = require('express').Router();
const upload = require('../config/multer')
const {GetByAddress, CountMoney, GetSequence, UpdateName, UpdateAvatar, GetAvatar, GetName} = require('../controllers/Detail');






router.get('/:address/list', GetByAddress);
router.get('/:address/total', CountMoney);
router.get('/:address/sequence', GetSequence)
router.get('/:address/avatar', GetAvatar)
router.get('/:address/name', GetName)

//update

router.put('/:address/name', UpdateName);
router.put('/:address/avatar', upload.single('avatar'),UpdateAvatar);
module.exports = router;
