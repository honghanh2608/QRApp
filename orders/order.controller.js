const db = require('../models/database');
const jwt = require('jsonwebtoken');
const key = 'vietnam';
const generalErr = require('../messages').generalErr;
const handleGet = require('../messages').handleGet;

const getAll = function (req, res) {
    let sql = 'SELECT * FROM `order`';
    db.query(sql, [], function (err, result) {
        if (err) {
            generalErr(res);
            return
        }
        handleGet(res, result)
    })
};

const getOne = function (req, res) {
    let id = req.params['id'];
    let sql = 'SELECT `order`.*, product.properties FROM `order` INNER JOIN product ON `order`.`product_id` = product.id WHERE `order`.`id` = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        handleGet(res, result[0])
    })
};

const create = function (req, res) {
    let sql = 'INSERT INTO `order` (product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, ?)';
    let params = [
        req.body['productId'],
        req.body['quantity'],
        new Date(),
        new Date(),
    ];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            generalErr(res);
            return
        }
        let id = result.insertId;
        let sql = 'SELECT `order`.*, product.properties FROM `order` INNER JOIN product ON `order`.`product_id` = product.id WHERE `order`.`id` = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                generalErr(res);
                return
            }
            handleGet(res, result[0])
        })
    })
};

const update = function (req, res) {

};

const remove = function (req, res) {

};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
