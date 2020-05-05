const db = require('../models/database');

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
      if (product != null && reviews != null){
        product.reviews = reviews;
        res.status(200).json(product);
      }
    })
  })
};

exports.createProduct = function (req, res) {
  let properties = {};
  console.log(req);
};

exports.updateProduct = function (req, res) {

};

exports.deleteProduct = function (req, res) {

};
