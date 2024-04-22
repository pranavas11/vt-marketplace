// controllers/admin.js
import UserModel from '../models/user.js'; // Assuming you have a UserModel
import Post from '../models/post.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}).select('-password'); // Exclude passwords for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getCategoryStats = async (req, res) => {
    try {
        // Group the posts by category and count them
        const categoryStats = await Post.aggregate([
            { $match: { tag: { $exists: true, $ne: null } } }, // ensure the tag exists and is not null
            { $group: { _id: '$tag', count: { $sum: 1 } } }
        ]);

        res.status(200).json(categoryStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to get listing statistics
export const getListingStats = async (req, res) => {
    try {
        // Calculate the total number of listings
        const listingCount = await Post.countDocuments();

        // Respond with the listing count
        res.status(200).json({ listingCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to get user statistics
export const getUserStats = async (req, res) => {
    try {
        // Calculate the total number of users
        const userCount = await UserModel.countDocuments();

        // Respond with the user count
        console.log(`There are ${count} users.`);
        res.status(200).json({ userCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deactivateUser = async (req, res) => {
    const { userID } = req.params; // Assuming userID is passed as a URL parameter

    try {
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isActive = false; // Assuming there is an isActive flag in your schema
        await user.save();
        res.status(200).json({ message: "User has been deactivated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const reactivateUser = async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isActive = true;
        await user.save();
        res.status(200).json({ message: "User has been reactivated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const promoteToAdmin = async (req, res) => {
    const { userID } = req.params; // userID passed as a URL parameter

    try {
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the user is already an admin
        if (user.isAdmin) {
            return res.status(400).json({ message: "User is already an admin." });
        }

        // Set the isAdmin flag to true
        user.isAdmin = true;
        await user.save();
        
        res.status(200).json({ message: "User has been promoted to admin successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ... other admin functionality
