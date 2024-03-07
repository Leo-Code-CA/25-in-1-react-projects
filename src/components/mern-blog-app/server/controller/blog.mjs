import mongoose from 'mongoose';
import { Blog } from '../schemas_models/blog.mjs';

const blog_list = async (req, res, next) => {
	let blogList;

	try {
		blogList = await Blog.find().exec();
	} catch (error) {
		console.log(error);
	}

	if (!blogList) {
		return res.status(404).json({ message: 'No Blog Found.' });
	}

	return res.status(200).json({ blogList });
};

// STOPPED AT 8:44
