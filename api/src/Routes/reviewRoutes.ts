import express from 'express'
import {getReviews, setReview, deleteReview} from '../controllers/reviewController'
import {protect} from '../middleware/authMiddleware'

const router = express.Router()

// Get reviews might be available to everybody
router.route('/')
    .get(protect, getReviews)
    .post(protect, setReview)
// Users are not able to update their reviews, but can delete them if they change their mind
router.route('/:id')
    .delete(protect, deleteReview)

module.exports = router