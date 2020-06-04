const db = require('../models/database');
const generalErr = require('../messages').generalErr;

exports.getProduct = function (req, res) {
    let product = null;
    let reviews = null;
    let productId = req.params.productId;
    let sql = 'SELECT * FROM product WHERE product.id = ?';
    db.query(sql, [productId], (err, response) => {
        if (err) throw err;
        product = response[0];
        sql = 'SELECT user.username, review.content, review.rate, review.datetime FROM user JOIN review ON user.id = review.user_id WHERE review.product_id = ?';
        db.query(sql, [productId], (err, response) => {
            if (err) throw err;
            reviews = response;
            if (product != null && reviews != null) {
                product.reviews = reviews;
                res.status(200).json(product);
            }
        })
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
    ];
    db.query(sql, params, (err, result) => {
        if (err) {
            generalErr(res);
            return
        }
        let id = result.insertId;
        res.status(201).json({
            id: id,
            name: req.body.name,
            properties: req.body.properties,
            manufacturer: req.body['manufacturer'],
            mfg: req.body['mfg'],
            exp: req.body['exp'],
            count: req.body['count'],
            price: req.body['price'],
            category_id: req.body['category_id']
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
    db.query(sql, [id, count], (err, result) => {
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
