const db = require('../models/database');
const handleErr = require('../messages').handleErr;
const handleSuccess = require('../messages').handleSuccess;
const generalErr = require('../messages').generalErr;
const md5 = require('md5');

const create = function(req, res) {
    if (!req.body) {
        handleErr(res, 400, "Body must not be empty.");
        return
    }
    let sql = "INSERT INTO user (email, username, password, permission, access_token) VALUES (?, ?, ?, ?, '')";
    let values = [req.body.email, req.body.username, md5(req.body.password), 2];
    db.query(sql, values, (err) => {
        if (err) {
            generalErr(res);
            return
        }
        handleSuccess(res, 201, {message: "Created a new staff successfully."})
    })
};

const update = function(req, res) {
    if (!req.body) {
        handleErr(res, 400, "Body must not be empty.");
        return
    }
    let id = req.params['id'];
    let sql = "UPDATE user SET email=?, username=?, password=? WHERE id=?";
    let values = [req.body.email, req.body.username, md5(req.body.password), id];
    db.query(sql, values, (err) => {
        if (err) {
            generalErr(res);
            return
        }
        handleSuccess(res, 201, {message: "Update staff successfully."})
    })
};

const remove = function(req, res) {
    if (!req.body) {
        handleErr(res, 400, "Body must not be empty.");
        return
    }
    let sql = "DELETE FROM user WHERE id=? AND permission=2";
    let values = [req.body.id];
    db.query(sql, values, (err) => {
        if (err) {
            generalErr(res);
            return
        }
        handleSuccess(res, 201, {message: "Removed the staff successfully."})
    })
};

const get = function(req, res) {
    let sql = 'SELECT id, email, username FROM user WHERE permission=2';
    db.query(sql, [], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        handleSuccess(res, 200, result)
    })
};

module.exports = {
    get,
    create,
    update,
    remove
};
