const router = require('express').Router();
const {PostReaction,Post, Explore,GetComment,GetReaction,PostComment} = require('../controllers/Post');
router.post('/', Post);

router.get('/:address/explore', Explore)
router.get('/:address/comment/:object',GetComment)
router.get('/:address/reaction/:object',GetReaction)
router.post('/comment/:object',PostComment)
router.post('/reaction/:object',PostReaction)
module.exports = router;
