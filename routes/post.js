const router = require('express').Router();
const {Post, Explore,GetComment,GetReaction} = require('../controllers/Post');
router.post('/', Post);

router.get('/:address/explore', Explore)
router.get('/:address/comment/:object',GetComment)
router.get('/:address/reaction/:object',GetReaction)
module.exports = router;
