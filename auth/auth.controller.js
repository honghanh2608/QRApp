const db = require('../models/dbsqlite');
const handleErr = require('../messages').handleErr;
const handleSuccess = require('../messages').handleSuccess;
const generalErr = require('../messages').generalErr;
const jwt = require('jsonwebtoken');
const secretKey = "vietnam";
const md5 = require('md5');

const user = function (req, res) {
    if (!req.body) {
        handleErr(res, 400, "Body must not be empty");
        return;
    }
    let sql = 'SELECT * FROM user WHERE email=?';
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        console.log(result);
        if (result.length === 0) {
            handleErr(res, 401, "Email is not correct");
            return
        }
        let account = result[0];
        if (account.password !== req.body.password) {
            handleErr(res, 401, "Password is not correct");
            return
        }
        let payload = {
            email: req.body.email,
            id: account.id,
            exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
        };
        console.log(payload);
        let token = jwt.sign(payload, secretKey);
        console.log(token);
        handleSuccess(res, 200, {
            id: account.id,
            permission: account.permission,
            message: 'Logged in successfully',
            access_token: token
        });
    })
};

const admin = function (req, res) {
    if (!req.body) {
        handleErr(res, 400, "Body must not be empty");
        return;
    }
    let sql = 'SELECT * FROM user WHERE email=?';
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        console.log(result);
        if (result.length === 0) {
            handleErr(res, 401, "Email is not correct");
            return
        }
        let account = result[0];
        if (account.password !== md5(req.body.password)) {
            handleErr(res, 401, "Password is not correct");
            return
        }
        if (account.permission !== 1) {
            handleErr(res, 401, "You are not an admin");
            return
        }
        let payload = {
            email: req.body.email,
            id: account.id,
            permission: 1,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };
        console.log(payload);
        let token = jwt.sign(payload, secretKey);
        console.log(token);
        handleSuccess(res, 200, {
            id: account.id,
            permission: account.permission,
            message: 'Logged in as admin',
            access_token: token
        });
    })
};

const staff = function (req, res) {
    if (!req.body) {
        handleErr(res, 400, "Body must not be empty");
        return;
    }
    let sql = 'SELECT * FROM user WHERE email=?';
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        console.log(result);
        if (result.length === 0) {
            handleErr(res, 401, "Email is not correct");
            return
        }
        let account = result[0];
        if (account.password !== md5(req.body.password)) {
            handleErr(res, 401, "Password is not correct");
            return
        }
        if (account.permission !== 2) {
            handleErr(res, 401, "You are not a staff");
            return
        }
        let payload = {
            email: req.body.email,
            id: account.id,
            permission: 2,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };
        console.log(payload);
        let token = jwt.sign(payload, secretKey);
        console.log(token);
        handleSuccess(res, 200, {
            id: account.id,
            permission: account.permission,
            message: 'Logged in as staff',
            access_token: token
        });
    })
};

const auth = function (req, res) {
    if (!req.body) {
        handleErr(res, 400, "Body must not be empty");
        return;
    }
    let sql = 'SELECT * FROM user WHERE email=?';
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        console.log(result);
        if (result.length === 0) {
            handleErr(res, 401, "Email is not correct");
            return
        }
        let account = result[0];
        if (account.password !== md5(req.body.password)) {
            handleErr(res, 401, "Password is not correct");
            return
        }
        // if (account.permission !== 2) {
        //     handleErr(res, 401, "You are not a staff");
        //     return
        // }
        let payload = {
            email: req.body.email,
            id: account.id,
            permission: account.permission,
            exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
        };
        let permission = account.permission;
        let role = (permission === 0) ? "user" : (permission === 1 ? "admin" : "staff");
        let token = jwt.sign(payload, secretKey);
        console.log(token);
        handleSuccess(res, 200, {
            id: account.id,
            permission: account.permission,
            message: 'Logged in as ' + role,
            access_token: token,
            username: account.username
        });
    })
};

const changePassword = function(req, res, next) {
    if (!req.headers['access_token']) {
        res.status(401).json({
            message: 'Unauthorized'
        });
        return;
    }
    let id = req.body['id'];
    let oldPassword = req.body['oldPassword'];
    let newPassword = req.body['newPassword'];
    if (!oldPassword) {
        res.status(400).json({message: 'Old password not found'});
        return
    }
    if (!newPassword) {
        res.status(400).json({message: 'New password not found'});
        return
    }
    db.query('SELECT * FROM user WHERE id=? and password=?', [id, md5(oldPassword)], (err, result) => {
        if (!result) {
            res.status(400).json({message: 'Old message is incorrect'});
            return
        }
        let params = [md5(newPassword), id];
        db.run('UPDATE user SET password=? WHERE id=?', params, (r) => {
            res.status(200).json({message: 'Password is update successfully'});
        })
    })
};

module.exports = {
    user,
    admin,
    staff,
    auth,
    changePassword
};
