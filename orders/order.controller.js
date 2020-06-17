const db = require('../models/dbsqlite');
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
    let timestamp = new Date();
    let data = req.body['data'];
    let flag = true;
    data.map(item => {
        let sql = 'INSERT INTO tblorder (id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
        let params = [
            timestamp.getTime(),
            item['productId'],
            item['quantity'],
            timestamp.getTime(),
            timestamp.getTime()
        ];
        db.run(sql, params, (result) => {
            if (!result['lastID']) flag = false
        })
    });
    if (flag) {
        res.status(201).json({message: 'Success'})
    } else {
        res.status(400).json({message: 'Failed'})
    }
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
