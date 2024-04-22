// routes/admin.js

import express from 'express'
import { createAdminUser } from '../controllers/user.js';
import {
    getAllUsers,
    deactivateUser,
    promoteToAdmin,
    // getUserStats,
    // getListingStats,
    // getCategoryStats,
    // ...other imports
  } from '../controllers/admin.js';
  import adminAuth from '../middleware/adminAuth.js';
  import auth from '../middleware/auth.js'

  

const router = express.Router()

router.get('/users', adminAuth, getAllUsers)
router.patch('/deactivate/:userID', adminAuth, deactivateUser)
router.post('/createAdmin', adminAuth, createAdminUser);
router.patch('/promote/:userID', adminAuth, promoteToAdmin);
// Get total number of users
// router.get('/stats/users', adminAuth, async (req, res) => {
//     const userCount = await UserModel.countDocuments();
//     res.json({ userCount });
//   });
  
//   // Get total number of listings
//   router.get('/stats/listings', adminAuth, async (req, res) => {
//     const listingCount = await Post.countDocuments();
//     res.json({ listingCount });
//   });
  
//   // Get number of listings per category (assuming your listing model has a 'category' field)
//   router.get('/stats/listings/category', adminAuth, async (req, res) => {
//     const categoryCounts = await Post.aggregate([
//       { $group: { _id: "$category", count: { $sum: 1 } } }
//     ]);
//     res.json({ categoryCounts });
//   });
// router.get('/stats/users', adminAuth, getUserStats);
// router.get('/stats/listings', adminAuth, getListingStats);
// router.get('/stats/listings/category', adminAuth, getCategoryStats);

// ... other admin routes

export default router
