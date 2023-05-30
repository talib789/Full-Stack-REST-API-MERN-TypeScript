import express from 'express'
import {getAddress, setAddress, updateAddress, deleteAddress} from '../controllers/addressController'
import {protect} from '../middleware/authMiddleware'

const router = express.Router()

router.route('/')
    .get(protect, getAddress)
    .post(protect, setAddress)
router.route('/:id')
    .put(protect, updateAddress)
    .delete(protect, deleteAddress)

module.exports = router