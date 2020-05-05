const express = require('express');
const router = express.Router();
const pc = require('./product.controller');

router.get('/products/:productId', pc.getProduct);
router.post('/1/products', pc.createProduct);
router.put('/admin/products/:productId', pc.updateProduct);
router.delete('/admin/products/:productId', pc.deleteProduct);

module.exports = router;