const express = require('express');
const Order = require('./order.model');
const router = express.Router();

const { createAnOrder,getAllOrders, getOrderByEmail } = require('./order.controller');

router.post('/create-order', createAnOrder );

router.get('/', getAllOrders);

router.get('/email/:email', getOrderByEmail);

// router.get('/:id', getSingleOrder);

// router.put('/edit/:id', updateOrder);

// router.delete('/delete/:id', deleteOrder);

 
module.exports = router;