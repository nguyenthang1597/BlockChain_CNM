const router = require('express').Router();
const upload = require('../config/multer')
const {GetByAddress, CountMoney, GetSequence, UpdateName, UpdateAvatar, GetAvatar, GetName, GetEnergy,FollowUser,GetFollowing, GetFollower} = require('../controllers/Detail');

router.get('/:address/list', GetByAddress);
router.get('/:address/balance', CountMoney);
router.get('/:address/sequence', GetSequence)
router.get('/:address/avatar', GetAvatar)
router.get('/:address/name', GetName)
// router.get('/:address/bandwith', Bandwith)
router.get('/:address/energy', GetEnergy)
router.get('/:address/follow',GetFollowing)
router.get('/:address/follower', GetFollower);
//update

router.put('/:address/name', UpdateName);
router.put('/:address/avatar', upload.single('avatar'),UpdateAvatar);
router.put('/:address/follow',FollowUser)
module.exports = router;
