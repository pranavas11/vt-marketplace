// routes/admin.js

import express from 'express'
import { getAllUsers, deactivateUser } from '../controllers/admin.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()

router.get('/users', adminAuth, getAllUsers)
router.patch('/deactivate/:userID', adminAuth, deactivateUser)

// ... other admin routes

export default router
