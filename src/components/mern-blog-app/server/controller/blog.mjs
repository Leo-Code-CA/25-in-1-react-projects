import mongoose from 'mongoose';
import { Blog } from '../schemas_models/blog.mjs';

// Display list of all blogs.
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
// Handle create book on POST.
const blog_create = async (req, res) => {
	const { title, description } = req.body;
	const currentDate = new Date();

	const newBlog = new Blog({
		title,
		description,
		date: currentDate
	});

	try {
		await newBlog.save();
	} catch (error) {
		console.log(error);
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await newBlog.save(session);
		session.commitTransaction();
	} catch (error) {
		return res.status(500).json({message: error});
	}

	return res.status(201).json({newBlog});
};

// Handle blog delete on DELETE.
const blog_delete = async (req, res, next) => {
	
	const id = req.params.id;

	try {
		const findBlog = await Blog.findByIdAndDelete(id);
		if (!findBlog) {
			return res.status(404).json({message: "Blog not found."});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Unable to delete. Please try again"});
	}

	return res.status(200).json({ message: "Blog successfully deleted"});
};

// Handle blog update on PUT.
const blog_update = async (req, res) => {

	const id = req.params.id;

	const { title, description } = req.body;

	let blogToUpdate;

	try {
		blogToUpdate = await Blog.findByIdAndUpdate(id, {
			title, description
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong while updating! Please try agin"});
	}

	if(!blogToUpdate) {
		return res.status(404).json({message: "Couldn't find the blog to update. Please try again"});
	}

	return res.status(200).json({ blogToUpdate });
};

const blog_controller = {
	blog_list,
	blog_create,
	blog_delete,
	blog_update
};

export default blog_controller;