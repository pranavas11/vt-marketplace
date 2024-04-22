import express from 'express'
import { signin, signup, getCurrentUser, deleteCurrentUser, deleteUser, updateCurrentUser, updateCurrentUserPWD, getUserByID, getUserStats, getListingStats, getCategoryStats, getAverageListingPrice } from '../controllers/user.js'
import auth from '../middleware/auth.js'
import { getPostsByUser } from '../controllers/home.js'

const router = express.Router()

//get current user
router.get('/currentUser', auth, getCurrentUser)

//account creation, signin
router.post('/signin', signin)
router.post('/signup', signup)

//acount deletion
router.delete('/delete', auth, deleteCurrentUser)
router.delete('/delete/:userID', auth, deleteUser)

//get posts by user
router.get('/posts/:userID', auth, getPostsByUser)

//update user info: fname, lname, email
router.patch('/update', auth, updateCurrentUser)

//update password
router.patch('/updatePassword', auth, updateCurrentUserPWD)

router.get('/:userID', auth, getUserByID)

//Stats
router.get('/stats/users', auth, getUserStats);
router.get('/stats/listings', auth, getListingStats);
router.get('/stats/listings/category', auth, getCategoryStats);
router.get('/stats/listings/average-price', auth, getAverageListingPrice);
export default router
