import Post, { IPost } from "../models/Post";
import mongoose from "mongoose";

// Define types for post data
interface PostData {
  title: string;
  content: string;
  author: string; // String input, will be converted to ObjectId
}

interface UpdatePostData {
  title?: string;
  content?: string;
  author?: string;
}

// Get all posts function
const getPosts = async (): Promise<IPost[]> => {
  try {
    return await Post.find().populate("author", "name email").lean().exec();
  } catch (error) {
    throw new Error(`Error fetching posts: ${(error as Error).message}`);
  }
};

// Create a new post function
const createPost = async (postData: PostData): Promise<IPost> => {
  try {
    const { title, content, author } = postData;

    if (!title || !content || !author) throw new Error("All fields are required");

    const newPost = new Post({
      title,
      content,
      author: new mongoose.Types.ObjectId(author),
    });

    await newPost.save();
    return newPost;
  } catch (error) {
    throw new Error(`Error creating post: ${(error as Error).message}`);
  }
};

// Update an existing post function
const updatePost = async (id: string, updateData: UpdatePostData): Promise<IPost | null> => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true }).lean().exec();
    if (!updatedPost) throw new Error("Post not found");
    return updatedPost;
  } catch (error) {
    throw new Error(`Error updating post: ${(error as Error).message}`);
  }
};

// Delete a post function
const deletePost = async (id: string): Promise<IPost | null> => {
  try {
    const deletedPost = await Post.findByIdAndDelete(id).exec();
    if (!deletedPost) throw new Error("Post not found");
    return deletedPost;
  } catch (error) {
    throw new Error(`Error deleting post: ${(error as Error).message}`);
  }
};

export { getPosts, createPost, updatePost, deletePost };
