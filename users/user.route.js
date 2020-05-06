const express = require('express');
const router = express.Router();
const uc = require('./user.controller');
const jwt = require('jsonwebtoken');
const handleErr = require('../messages').handleErr;
const isValidToken = require('../utils/utils').isValidToken;

// router.post('/signup', uc.signUp);
// router.post('/login', uc.logIn);

router.use(function (req, res, next) {
    let accessToken = req.headers['access_token'];

    switch (req.method) {
        case "POST": {
            next(); //todo đăng ký tài khoản không cần access token
            break;
        }
        case "PUT": { //todo cập nhật tài khoản yêu cầu quyền của người dùng
            let errToken = isValidToken(accessToken, 0); //todo kiểm tra token gửi lên có hợp lệ && của người dùng thông thường hay không
            if (!errToken) { //todo nếu không có lỗi
                next();
            } else {
                handleErr(res, 401, errToken); //todo trả về lỗi liên quan đến token
            }
            break;
        }
        case "GET":
        case "DELETE": { //todo cần quyền của admin để xem danh sách người dùng, xoá người dùng
            let errToken = isValidToken(accessToken, 1);
            if (!errToken) {
                next();
            } else {
                handleErr(res, 401, errToken)
            }
        }
    }
});

router.get('/', uc.getAllUser); //retrieve all users in the database
router.post('/', uc.createUser); //create new user
router.put('/', uc.updateUser); //update user
router.delete('/', uc.deleteUser); //remove user

module.exports = router;
