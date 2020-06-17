// const db = require('../models/database');
const generalErr = require('../messages').generalErr;
const db = require('../models/dbsqlite');

exports.getAll = function (req, res) {
    let sql = 'SELECT * FROM product';
    db.query(sql, [], (err, result) => {
        if (err) {
            generalErr(res);
            return;
        }
        res.status(200).json(result);
    })
};

exports.getProduct = function (req, res) {
    let product = null;
    let barcode = req.query['barcode'];
    console.log(barcode);
    let sql = 'SELECT * FROM product WHERE barcode="' + barcode + '"';
    console.log('sql', sql);
    db.query(sql, [], (err, response) => {
        if (err) throw err;
        product = response[0];
        console.log(response);
        res.status(200).json(product);
    })
};

exports.createProduct = function (req, res) {
    let sql = "INSERT INTO product (name, properties, manufacturer, mfg, exp, count, price, category_id) VALUES (?,?,?,?,?,?,?,?)";
    let params = [
        req.body.name,
        req.body.properties,
        req.body['manufacturer'],
        req.body['mfg'],
        req.body['exp'],
        req.body['count'],
        req.body['price'],
        req.body['category_id'],
        req.body['barcode']
    ];
    db.run(sql, params, (result) => {
        let id = result['lastID'];
        res.status(201).json({
            id: id,
            name: req.body.name,
            properties: req.body.properties,
            manufacturer: req.body['manufacturer'],
            mfg: req.body['mfg'],
            exp: req.body['exp'],
            count: req.body['count'],
            price: req.body['price'],
            category_id: req.body['category_id'],
            barcode: req.body['barcode']
        })
    })
};

exports.updateProduct = function (req, res) {
    //update so luong san pham
    let id = req.params['id'];
    let count = req.body['count'];
    if (count < 0) {
        res.status(400).json({
            message: 'Count must be non-negative value'
        });
        return
    }
    let sql = 'UPDATE product SET count=? WHERE id=?';
    db.run(sql, [id, count], (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        res.status(201).json({
            message: 'Update successfully'
        })
    })
};

exports.deleteProduct = function (req, res) {

};
