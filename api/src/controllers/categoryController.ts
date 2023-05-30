import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

import Category from '../models/categoryModel'
import User from "../models/userModel"

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await Category.find()
    res.status(200).json(categories)
})

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
})

// @desc    Set category by admin
// @route   POST /api/categories
// @access  Private
export const setCategory = asyncHandler(async (req: any, res: Response) => {
    if (!req.body.name || !req.body.image){
        res.status(400)
        throw new Error('Name and link to image of the category are required, please add it')
    }
    // Check if user has rights to create categories
    if (req.user.rights != "admin")
    {
        res.status(400)
        throw new Error('Only admins can create categories!');
    }

    const category = await Category.create({
        name: req.body.name,
        image: req.body.image,
        creator: req.user.id
    })

    res.status(201).json(category)
})

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req: any, res: Response) => {
    const category = await Category.findById(req.params.id)

    if (!category){
        res.status(400)
        throw new Error('Category not found')
    }

    // Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in user matches the category creator 
    if (category.creator.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedCategory)
})

// @desc    Delete category
// @route   DELETE /api/category/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req: any, res: Response) => {
    const category = await Category.findById(req.params.id)

    if (!category){
        res.status(400)
        throw new Error('Category not found')
    }

    const user = await User.findById(req.user.id)
    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in user matches the product owner
    if (category.creator.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await category.remove()
    res.status(200).json({id: req.params.id})
})