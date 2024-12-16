const axios = require('axios');
const crypto = require('crypto');
const {createOrder} = require('../controllers/paymentController.js');
const express = require('express');
const router = express.Router();




router.get("/",createOrder)





module.exports = router;