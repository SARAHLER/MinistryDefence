const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const productsController=require('../controllers/productsController')
router.post('/', orderController.createOrder);
router.post('/addorder', orderController.addOrderProducts);
router.get('/getAllProducts', productsController.getAllProducts);

module.exports = router;
