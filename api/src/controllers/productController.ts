import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

import Product from '../models/productModel'
import User from "../models/userModel"

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find()
    res.status(200).json(products)
})

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
})

// @desc    Set product by a seller=admin
// @route   POST /api/products
// @access  Private
export const setProduct = asyncHandler(async (req: any, res: Response) => {
    if (!req.body.title || !req.body.price){
        res.status(400)
        throw new Error('Both title and price of the product are required, please, add them both!')
    }
    // Check if user has rights to create products
    if (req.user.rights != "admin")
    {
        res.status(400)
        throw new Error('Only admins can create products!');
    }

    const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        seller: req.user.id,
        categories: req.body.categories,
        reviews: req.body.reviews,
        images: req.body.images
    })

    res.status(201).json(product)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req: any, res: Response) => {
    const product = await Product.findById(req.params.id)

    if (!product){
        res.status(400)
        throw new Error('Product not found')
    }

    // Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in user matches the product owner 
    if (product.seller.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedProduct)
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req: any, res: Response) => {
    const product = await Product.findById(req.params.id)

    if (!product){
        res.status(400)
        throw new Error('Product not found')
    }

    const user = await User.findById(req.user.id)
    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in user matches the product owner
    if (product.seller.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await product.remove()
    res.status(200).json({id: req.params.id})
})