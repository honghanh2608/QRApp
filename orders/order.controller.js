const db = require('../models/dbsqlite');
const jwt = require('jsonwebtoken');
const key = 'vietnam';
const generalErr = require('../messages').generalErr;
const handleGet = require('../messages').handleGet;

const getAll = function (req, res) {
    let sql = 'SELECT tblorder.id as orderId, tblorder.quantity, tblorder.created_at, product.* from tblorder INNER JOIN product on product.barcode = tblorder.barcode';
    db.query(sql, [], function (err, result) {
        if (err) {
            generalErr(res);
            return
        }
        let arr = [];
        result.map(item => {
            let order = arr.find(or => or['id'] === item['orderId']);
            if (order) {
                order['products'].push(item)
            } else {
                order = {
                    id: item['orderId'],
                    products: [item]
                };
                arr.push(order);
            }
        });
        handleGet(res, arr)
    })
};

const getOne = function (req, res) {
    let id = req.params['id'];
    let sql = 'SELECT * FROM tblorder WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        handleGet(res, result)
    })
};

const create = function (req, res) {
    let timestamp = new Date();
    let data = req.body['data'];
    let flag = true;
    data.map(item => {
        let sql = 'INSERT INTO tblorder (id, barcode, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
        let params = [
            timestamp.getTime(),
            item['barcode'],
            item['quantity'],
            timestamp.getTime(),
            timestamp.getTime()
        ];
        db.run(sql, params, (result) => {
            if (!result['lastID']) flag = false
        })
    });
    if (flag) {
        res.status(201).json({orderId: timestamp.getTime()})
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
