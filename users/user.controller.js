const db = require('../models/database');
const jwt = require('jsonwebtoken');
const key = 'vietnam';
const generalErr = require('../messages').generalErr;
const handleGet = require('../messages').handleGet;

exports.signUp = function (req, res) {
    let user = {};
    let userId = 0;
    let accessToken = null;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    console.log(user);
    //kiểm tra tai khoản tồn tại không
    let sql = 'SELECT user.id FROM user WHERE user.email = ?';
    db.query(sql, [user.email], (err, response) => {
        if (err) throw err;
        if (response[0])
            res.status(400).json({message: 'Account has existed'});
        else {
            sql = 'INSERT INTO user (email, username, password) VALUES (?, ?, ?)';
            db.query(sql, [user.email, user.username, user.password], (err, response, fields) => {
                if (err) throw err;
                userId = response.insertId;
                //sinh access token
                let dataAuth = {
                    userId: userId,
                    email: user.email,
                    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // trong 30 ngay
                };
                accessToken = jwt.sign(dataAuth, key);
                sql = 'UPDATE user SET access_token = ? WHERE id = ?';
                db.query(sql, [accessToken, userId], (err, response) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'Created user successfully',
                        access_token: accessToken
                    })
                })
            });
        }
    });
};

exports.logIn = function (req, res) {
    let accessToken = null;
    let userId = 0;
    let user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    let sql = 'SELECT user.id FROM user WHERE user.email = ? AND user.password = ?';
    db.query(sql, [user.email, user.password], (err, response) => {
        if (err) throw err;
        if (!response[0]) {//sai
            res.status(404).json({message: 'Email or password is wrong'});
        } else {
            userId = response[0].id;
            let dataAuth = {
                userId: userId,
                email: user.email,
                exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
            };
            accessToken = jwt.sign(dataAuth, key);
            sql = 'UPDATE user SET access_token = ? WHERE id = ?';
            db.query(sql, [accessToken, userId], (err, response) => {
                if (err) throw err;
                res.status(200).json({
                    message: 'Login successfully',
                    access_token: accessToken
                })
            })
        }
    });
};


/**
 * TODO: Xoay quanh CRUD của 1 Model
 * Retrieve == SELECT == Lấy toàn bộ danh sách
 * Create == INSERT INTO == Tạo mới
 * Update == UPDATE == Cập nhật
 * Delete == DELETE == Xoá
 */

const getAllUser = function (req, res) {
    let sql = 'SELECT id, email, username FROM user WHERE permission = 0';
    db.query(sql, [], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        handleGet(res, result)
    })
};

//todo Tạo tài khoản mới
const createUser = function (req, res) {
    let user = {};
    let userId = 0;
    let accessToken = null;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    console.log(user);
    //kiểm tra tai khoản tồn tại không
    let sql = 'SELECT user.id FROM user WHERE user.email = ?';
    db.query(sql, [user.email], (err, response) => {
        if (err) throw err;
        if (response[0])
            res.status(400).json({message: 'Account has existed'});
        else {
            sql = 'INSERT INTO user (email, username, password) VALUES (?, ?, ?)';
            db.query(sql, [user.email, user.username, user.password], (err, response, fields) => {
                if (err) throw err;
                userId = response.insertId;
                //sinh access token
                let dataAuth = {
                    userId: userId,
                    email: user.email,
                    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // trong 30 ngay
                };
                accessToken = jwt.sign(dataAuth, key);
                sql = 'UPDATE user SET access_token = ? WHERE id = ?';
                db.query(sql, [accessToken, userId], (err, response) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'Created user successfully',
                        access_token: accessToken
                    })
                })
            });
        }
    });
};

//todo Cập nhật user, dùng khi đổi mật khẩu
const updateUser = function (req, res) {

};

//todo Xoá user
const deleteUser = function (req, res) {

};

module.exports = {
    createUser,
    getAllUser,
    updateUser,
    deleteUser
};
