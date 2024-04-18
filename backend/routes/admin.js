// routes/admin.js

import express from 'express'
import { getAllUsers, deactivateUser } from '../controllers/admin.js'
import adminAuth from '../middleware/adminAuth.js'
import { promoteToAdmin } from '../controllers/admin.js';
import { createAdminUser } from '../controllers/user.js';

const router = express.Router()

router.get('/users', adminAuth, getAllUsers)
router.patch('/deactivate/:userID', adminAuth, deactivateUser)
router.post('/createAdmin', adminAuth, createAdminUser);
router.patch('/promote/:userID', adminAuth, promoteToAdmin);

// ... other admin routes

export default router
