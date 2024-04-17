import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'; 

const secret = process.env.SECRET || 'test'

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        let decodedData = jwt.verify(token, secret)
        req.userId = decodedData?.id

        const user = await UserModel.findById(req.userId)
        if (!user) return res.status(401).json({ message: 'Unauthorized' })
        
        if (!user.isAdmin) return res.status(403).json({ message: 'Forbidden' }) // Check if user is admin
        
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default adminAuth