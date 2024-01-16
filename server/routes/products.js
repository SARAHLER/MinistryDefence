const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/', productsController.addProduct);
router.post('/createTable', productsController.createTable);
router.get('/getAllProducts', productsController.getAllProducts);



module.exports = router;
