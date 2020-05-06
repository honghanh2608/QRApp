const express = require('express');
const router = express.Router();
const controller = require('./order.controller');
const jwt = require('jsonwebtoken');
const handleErr = require('../messages').handleErr;
const isValidToken = require('../utils/utils').isValidToken;
const isValidTokenExcept = require('../utils/utils').isValidTokenExcept;
const verifyToken = require('../utils/utils').verifyToken;

router.use(function (req, res, next) {
    let accessToken = req.headers['access_token'];
    if (req.method === "GET") {
        let errToken = isValidToken(accessToken);
        if (errToken) {
            res.status(401).json({
                message: errToken
            });
            return
        }
        next();
    }

    if (req.method === "POST") {
        let errToken = isValidTokenExcept(accessToken, 0);
        if (errToken) {
            res.status(401).json({
                message: errToken
            });
            return
        }
        next();
    }
});

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);

module.exports = router;
