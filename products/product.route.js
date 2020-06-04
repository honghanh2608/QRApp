const express = require('express');
const router = express.Router();
const pc = require('./product.controller');



router.get('/:productId', pc.getProduct);
router.post('/', pc.createProduct);
router.put('/:productId', pc.updateProduct);
router.delete('/:productId', pc.deleteProduct);

module.exports = router;
