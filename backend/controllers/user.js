import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'
import Post from '../models/post.js'
const secret = process.env.SECRET || 'test'

/**
 * 
 * @param {*} req
 * 		- req.body.email
 * 		- req.body.password 
 * @param {*} res 
 * 		- 200: User signed in successfully
 * 		- 400: Invalid credentials.
 * 		- 404: User does not exist
 * 		- 500: error.message
 * @returns 
 */
export const signin = async (req, res) => {
	const { email, password } = req.body

	try {
		const userExists = await UserModel.findOne({ email })
		if (!userExists) return res.status(404).json({ message: 'User does not exist' })

		const passwordIsRight = await bcrypt.compare(password, userExists.password)

		if (!passwordIsRight) return res.status(400).json({ message: 'Invalid credentials.' })

		const token = jwt.sign({ email: userExists.email, id: userExists._id, isAdmin: userExists.isAdmin }, secret, {
			expiresIn: '24h',
		})

		res.status(200).json({ result: userExists, token, isAdmin: userExists.isAdmin})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

/**
 * 
 * @param {*} req
 * 		- req.body.email
 * 		- req.body.password
 * 		- req.body.fname
 * 		- req.body.lname
 * 		- req.body.confirmPassword 
 * @param {*} res 
 * 		- 201: User created successfully
 * 		- 400: A user with that email already exists.
 * 		- 400: passwords do not match
 * 		- 500: error.message
 * @returns 
 */
export const signup = async (req, res) => {
	const { email, password, fname, lname, confirmPassword } = req.body

	try {
		const userExists = await UserModel.findOne({ email })
		if (userExists) return res.status(400).json({ message: 'A user with that email already exists.' })

		if (password !== confirmPassword) return res.status(400).json({ message: 'passwords do not match' })

		let hashedPassowrd = await bcrypt.hash(password, 12)
		const result = await UserModel.create({
			fname,
			lname,
			email,
			password: hashedPassowrd,
		})
		const token = jwt.sign({ email: result.email, id: result._id }, secret, {
			expiresIn: '24h',
		})

		res.status(201).json({ result, token })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

/**
 * 
 * @param {*} req 
 * 		- req.userId
 * @param {*} res 
 * 		- 200: User found
 * 		- 404: User not found
 * 		- 500: error.message
 * @returns 
 */
export const getCurrentUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
		user.password = undefined
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 
 * @param {*} req
 * 		- req.params.userID 
 * @param {*} res 
 * 		- 200: User found
 * 		- 400: No user ID provided
 * 		- 404: User not found
 * 		- 500: error.message
 * @returns 
 */
export const getUserByID = async (req, res) => {
	if (!req.params.userID) { return res.status(400).json({ message: 'No user ID provided' }) }
	try {
		const user = await UserModel.findById(req.params.userID);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		user.password = undefined
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
/**
 * Create a new admin user.
 * 
 * @param {*} req - The request object, including admin user details.
 * @param {*} res - The response object.
 * @returns A success response with the new admin user data, or an error message.
 */
export const createAdminUser = async (req, res) => {
    // Destructure the relevant data from req.body
    const { email, password, fname, lname } = req.body;

    try {
        // Check if a user with the given email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user with isAdmin set to true
        const newUser = new UserModel({
            fname,
            lname,
            email,
            password: hashedPassword,
            isAdmin: true
        });

        // Save the new admin user to the database
        const result = await newUser.save();

        // Create a token for the new admin user
        const token = jwt.sign(
            { email: result.email, id: result._id, isAdmin: result.isAdmin },
            secret,
            { expiresIn: "1h" } // You may want to set a short expiration time for admin tokens
        );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * 
 * @param {*} req
 * 		- req.params.userID 
 * @param {*} res 
 * 		- 200: User deleted successfully
 * 		- 400: No user ID provided
 * 		- 404: User not found
 * 		- 500: error.message
 * @returns 
 */
export const deleteUser = async (req, res) => {
	if (!req.params.userID) { return res.status(400).json({ message: 'No user ID provided' }) }
	try {
		const user = await UserModel.findById(req.params.userID);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		await user.deleteOne();
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

/**
 * 
 * @param {*} req
 * @param {*} res 
 * @returns 
 */
export const deleteCurrentUser = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		await user.deleteOne();
		//Delete all posts by user
		await Post.deleteMany({ creator: req.userId })
		//Delete all placed bids by user (in other posts)
		//If user has placed a bid on a post, remove the bidderID and set bid to 0
		//Cascade setting...
		const posts = await Post.find({ 'bids.bidderID': req.userId })
		posts.forEach(async (post) => {
			post.bids.forEach(async (bid) => {
				if(bid.bidderID === req.userId){
					bid.bidderID = ''
					bid.bid = 0
				}
			})
			await post.save()
		})
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

/**
 * 
 * @param {*} req
 * 		- req.body.fname
 * 		- req.body.lname
 * 		- req.body.email 
 * @param {*} res 
 * 		- 200: User updated successfully
 * 		- 400: No fields to update
 * 		- 404: User not found
 * 		- 500: error.message
 * @returns 
 */
export const updateCurrentUser = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const { fname, lname, email } = req.body;
		if (!fname && !lname && !email) return res.status(400).json({ message: 'No fields to update' })
		if (fname) user.fname = fname;
		if (lname) user.lname = lname;
		if (email) user.email = email;
		await user.save();
		res.status(200).json({ message: 'User updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

/**
 * 
 * @param {*} req 
 * 		- req.body.oldPassword
 * 		- req.body.password
 * 		- req.body.confirmPassword 
 * @param {*} res 
 * 		- 200: User password updated successfully
 * 		- 400: passwords do not match
 * 		- 400: Invalid credentials.
 * 		- 404: User not found
 * 		- 500: error.message
 * @returns 
 */
export const updateCurrentUserPWD = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const { password, confirmPassword, oldPassword } = req.body;
		if (password !== confirmPassword) return res.status(400).json({ message: 'passwords do not match' })
		const passwordIsRight = await bcrypt.compare(oldPassword, user.password)
		if (!passwordIsRight) return res.status(400).json({ message: 'Invalid credentials.' })
		let hashedPassowrd = await bcrypt.hash(password, 12)
		user.password = hashedPassowrd;
		await user.save();
		res.status(200).json({ message: 'User password updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
//Statistics

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}).select('-password'); // Exclude passwords for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get listing statistics
export const getListingStats = async (req, res) => {
    try {
        // Calculate the total number of listings
        const listingCount = await Post.countDocuments();
		console.log(`There are ${listingCount} listings.`);
        // Respond with the listing count
        res.status(200).json({ listingCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getCategoryStats = async (req, res) => {
    try {
        // Group the posts by category and count them
        const categoryStats = await Post.aggregate([
            {
                $group: {
                    _id: '$tag', // Assuming 'tag' is the field that stores the category
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1 // Optional: sorting by count in descending order
                }
            }
        ]);

        res.status(200).json(categoryStats);
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
        console.log(`There are ${userCount} users.`);
        res.status(200).json({userCount});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to calculate the average price of listings
export const getAverageListingPrice = async (req, res) => {
    try {
        // Calculate the average price of listings
        const averagePrice = await Post.aggregate([
            { $group: { _id: null, averagePrice: { $avg: "$price" } } }
        ]);

        // Extract the average price from the result
        const averageListingPrice = averagePrice.length > 0 ? averagePrice[0].averagePrice : 0;

        // Respond with the average listing price
        res.status(200).json({ averageListingPrice });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};



