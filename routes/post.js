const router = require('express').Router();
const {Post, Explore} = require('../controllers/Post');
router.post('/', Post);

router.get('/:address/explore', Explore)
module.exports = router;
