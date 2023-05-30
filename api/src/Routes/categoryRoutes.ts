import express from 'express'
import {getCategories, setCategory, updateCategory, deleteCategory, getCategory} from '../controllers/categoryController'
import {protect} from '../middleware/authMiddleware'

const router = express.Router()

// Not everybody is allowed to create, update, and delete categories
// Check for access rights is happening only in POST request, only then admin's id is attached to the category
// We do not need to check for rights in PUT and DELETE requests, because the protect middleware checks for the right user
// to do certain operations on categories, which can only have been created by admins
router.route('/')
    .get(getCategories)
    .post(protect, setCategory)
router.route('/:id')
    .get(getCategory)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory)

module.exports = router