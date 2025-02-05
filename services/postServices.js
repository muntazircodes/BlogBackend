const Post = require("../models/Post");

const getPosts = async () => {
  return await Post.find();
};

const createPost = async (postData) => {
  const { title, content, author } = postData;

  if (!title || !content || !author) throw new Error("All fields are required");

  const newPost = new Post({ title, content, author });
  await newPost.save();

  return newPost;
};

const updatePost = async (id, updateData) => {
  const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedPost) throw new Error("Post not found");
  return updatedPost;
};

module.exports = { getPosts, createPost, updatePost };
