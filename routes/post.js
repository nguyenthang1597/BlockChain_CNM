const router = require('express').Router();
const {Explore, GetCommentAndReaction} = require('../controllers/Post');
router.get('/:hash', GetCommentAndReaction)

router.get('/:address/explore', Explore)
module.exports = router;
