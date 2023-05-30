import express from 'express'
import {registerUser, loginUser, getMe} from '../controllers/userController'
import {protect} from '../middleware/authMiddleware'


const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
// Protect this rout to be used only when logged in
router.get('/me', protect, getMe)

module.exports = router