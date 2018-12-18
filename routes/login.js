const router = require('express').Router();
const {Login} = require('../controllers/Login');
router.post('/', Login);


module.exports = router;
