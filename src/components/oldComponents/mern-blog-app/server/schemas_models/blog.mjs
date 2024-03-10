import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export const Blog = mongoose.model('Blog', BlogSchema);
