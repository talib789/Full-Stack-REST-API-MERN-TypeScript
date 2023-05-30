import express from 'express'
import {getProducts, getProduct, setProduct, updateProduct, deleteProduct} from '../controllers/productController'
import {protect} from '../middleware/authMiddleware'

const router = express.Router()

// Not everybody is allowed to create, update, and delete products
// Check for access rights is happening only in POST request, only then admin's id is attached to the product
// We do not need to check for rights in PUT and DELETE requests, because the protect middleware checks for the right user
// to do certain operations on products, which can only have been created by admins
router.route('/')
    .get(getProducts)
    .post(protect, setProduct)
router.route('/:id')
    .get(getProduct)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct)

module.exports = router