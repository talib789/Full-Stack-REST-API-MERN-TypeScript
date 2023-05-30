import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {errorHandler} from './middleware/errorMiddleware'
import {connectDB} from './config/db'

dotenv.config({ path: '.env' })

const port = process.env.PORT || 5000

connectDB()

const app = express()

// This is to properly get data from requests
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// This is to allow share data between various local ports
app.use(cors())

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/address', require('./routes/addressRoutes'))
app.use('/api/reviews', require('./routes/reviewRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/cart', require('./routes/cartRoutes'))

// Overwrite default express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))