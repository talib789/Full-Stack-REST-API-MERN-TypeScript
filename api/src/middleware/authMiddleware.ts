import { Request, Response, NextFunction } from "express"
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'

const jwt = require('jsonwebtoken')

export const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    let token: any

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            // May be a problem because of req:any
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})