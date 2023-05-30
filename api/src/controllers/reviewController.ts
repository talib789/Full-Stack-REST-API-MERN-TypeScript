import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

import Review from '../models/reviewModel'
import User from '../models/userModel'

// @desc    Get all reviews from a user
// @route   GET /api/reviews
// @access  Private
export const getReviews = asyncHandler(async (req: any, res: Response) => {
    const reviews = await Review.find({ user: req.user.id })
    res.status(200).json(reviews)
})

// @desc    Set review by a user
// @route   POST /api/reviews
// @access  Private
export const setReview = asyncHandler(async (req: any, res: Response) => {
    if (!req.body.rate){
        res.status(400)
        throw new Error('Rate value is required, please add it')
    }

    const review = await Review.create({
        user: req.user.id,
        productId: req.body.productId,
        rate: req.body.rate,
        text: req.body.text
    })
    res.status(201).json(review)
})

// @desc    Delete user's review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = asyncHandler(async (req: any, res: Response) => {
    const review = await Review.findById(req.params.id)
    if (!review){
        res.status(400)
        throw new Error('Review not found')
    }

    const user = await User.findById(req.user.id)
    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in user matches the review owner
    if (review.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await review.remove()
    res.status(200).json({id: req.params.id})
})