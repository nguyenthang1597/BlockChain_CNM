const router = require('express').Router();
const upload = require('../config/multer')
const {PaymentHistory,GetInfo, GetByAddress, CountMoney, GetSequence, UpdateName, UpdateAvatar, GetAvatar, GetName, GetEnergy,GetFollowing, GetFollower} = require('../controllers/Detail');

router.get('/:address/list', GetByAddress);
router.get('/:address/balance', CountMoney);
router.get('/:address/sequence', GetSequence)
router.get('/:address/avatar', GetAvatar)
router.get('/:address/name', GetName)
router.get('/:address/energy', GetEnergy)
router.get('/:address/follow',GetFollowing)
router.get('/:address/follower', GetFollower);
router.get('/:address/info', GetInfo);
router.get('/:address/payment', PaymentHistory)
//update

router.put('/:address/name', UpdateName);
router.put('/:address/avatar', upload.single('avatar'),UpdateAvatar);
module.exports = router;
