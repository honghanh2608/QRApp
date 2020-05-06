const express = require('express');
const router = express.Router();
const controller = require('./staff.controller');
const jwt = require('jsonwebtoken');

router.use(function (req, res, next) {
    let accessToken = req.headers['access_token'];
    if (!accessToken) {
        res.status(401).json({message: 'access token not found !'});
        return;
    }
    try {
        let decode = jwt.verify(accessToken, "vietnam");
        if (decode.permission !== 1) {
            res.status(401).json({message: 'Permission is denied.'})
            return;
        }
        let exp = decode.exp;
        if (exp < (Date.now() / 1000)) {
            res.status(401).json({message: 'Access token has expired !'});
            return
        }
        next();
    } catch (e) {
        res.status(400).json({message: 'Access token is not valid'})
    }
});

router.get('/', controller.get);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.remove);

module.exports = router;
