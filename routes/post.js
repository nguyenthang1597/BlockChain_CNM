const router = require('express').Router();
const {Post} = require('../controllers/Post');
router.post('/', Post);


module.exports = router;
