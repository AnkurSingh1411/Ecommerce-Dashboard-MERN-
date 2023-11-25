const express = require('express');
const { addProduct, getProduct, deleteProduct, getProductById, searchProduct, updateProduct } = require('../controllers/product-controller');
const router = express.Router()
const { verifyToken } = require('../middleware/verifyJwt')

router.post('/add-product', verifyToken, addProduct)


// get product

router.get('/get-product', verifyToken, getProduct)

// delete product

router.delete('/delete-product/:id', verifyToken, deleteProduct)
// getProductById
router.get('/product/:id', verifyToken, getProductById)

//update Product
router.put('/product/:id', verifyToken, updateProduct)

//search product api
router.get('/search/:key', verifyToken, searchProduct)

module.exports = router

