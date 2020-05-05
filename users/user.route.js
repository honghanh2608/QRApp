const express = require('express');
const router = express.Router();
const uc = require('./user.controller');

router.post('/signup', uc.signUp);
router.post('/login', uc.logIn);

module.exports = router;
