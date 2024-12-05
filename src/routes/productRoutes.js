const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct,getProduct } = require('../controllers/productController');
const validateProduct=require("../middlewares/validatePro")

// Route to add a new product
router.post('/',validateProduct, addProduct);

// Route to update a product by ID
router.put('/:id', updateProduct);

// Route to delete a product by ID
router.delete('/:id', deleteProduct);

//Route to get all products 
router.get("/",getProduct)

module.exports = router;
