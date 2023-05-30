import express from 'express'
import {getCart, setCart, updateCart, deleteCart} from '../controllers/cartController'
import {protect} from '../middleware/authMiddleware'

const router = express.Router()

router.route('/')
    .get(protect, getCart)
    .post(protect, setCart)
router.route('/:id')
    .put(protect, updateCart)
    .delete(protect, deleteCart)

module.exports = router