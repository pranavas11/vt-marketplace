import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	fname : { type: String, required: true },
	lname : { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	id: { type: String },
	isAdmin: { type: Boolean, default: false }, // New field to indicate admin users
})

export default mongoose.model('User', userSchema)
