const db = require('../models/database');
const handleErr = require('../messages').handleErr;
const handleSuccess = require('../messages').handleSuccess;
const generalErr = require('../messages').generalErr;
const jwt = require('jsonwebtoken');
const secretKey = "vietnam";

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
        if (account.password !== req.body.password) {
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
        if (account.password !== req.body.password) {
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
            message: 'Logged in as staff',
            access_token: token
        });
    })
};

module.exports = {
    user,
    admin,
    staff
};
