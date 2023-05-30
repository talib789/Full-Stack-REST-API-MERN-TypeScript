import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'

import Address from '../models/addressModel'
import User from '../models/userModel'

// @desc    Get address
// @route   GET /api/address
// @access  Private
export const getAddress = asyncHandler(async (req: any, res: Response) => {
    const address = await Address.find({ user: req.user.id })
    res.status(200).json(address)
})

// @desc    Set address
// @route   POST /api/address
// @access  Private
export const setAddress = asyncHandler(async (req: any, res: Response) => {
    if(!req.body.city || !req.body.country || !req.body.street || !req.body.postalCode){
        res.status(400)
        throw new Error('Please, add all mandatory fields: city, country, street, postalCode!')
    }

    const address = await Address.create({
        user: req.user.id,
        city: req.body.city,
        country: req.body.country,
        street: req.body.street,
        postalCode: req.body.postalCode
    })
    res.status(201).json(address)
})

// @desc    Update address
// @route   PUT /api/address/:id
// @access  Private
export const updateAddress = asyncHandler(async (req: any, res: Response) => {
    const address = await Address.findById(req.params.id)
    if (!address){
        res.status(400)
        throw new Error('Address not found')
    }

    // Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in user matches the address owner 
    if (address.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedAddress)
})

// @desc    Delete address
// @route   DELETE /api/address/:id
// @access  Private
export const deleteAddress = asyncHandler(async (req: any, res: Response) => {
    const address = await Address.findById(req.params.id)
    if (!address){
        res.status(400)
        throw new Error('Address not found')
    }
    
    // Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in user matches the address owner
    if (address.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await address.remove()
    res.status(200).json({id: req.params.id})
})