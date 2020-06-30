const express = require('express');
const router = express.Router();

const controller = require('./auth.controller');

router.post('/user', controller.user);
router.post('/admin', controller.admin);
router.post('/staff', controller.staff);
router.post('/', controller.auth);

module.exports = router;
