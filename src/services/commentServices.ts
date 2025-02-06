import Comment, { IComment } from "../models/Comment"; // Fixed Import
import mongoose from "mongoose";

// Define types for comment data and response objects
interface CommentData {
  content: string;
  author: string; // Should be ObjectId but string in input
  postId: string;
}

interface UpdateCommentData {
  content?: string;
  author?: string;
  postId?: string;
}

// Get all comments function
const getComments = async (): Promise<IComment[]> => {
  return await Comment.find().populate("author", "name email").populate("post").lean();
};

// Create a new comment function
const createComment = async (commentData: CommentData): Promise<IComment> => {
  const { content, author, postId } = commentData;

  if (!content || !author || !postId) throw new Error("All fields are required");

  const newComment = new Comment({
    content,
    author: new mongoose.Types.ObjectId(author),
    post: new mongoose.Types.ObjectId(postId),
  });

  await newComment.save();
  return newComment;
};

// Update an existing comment function
const updateComment = async (id: string, updateData: UpdateCommentData): Promise<IComment> => {
  const updatedComment = await Comment.findByIdAndUpdate(id, updateData, { new: true, lean: true });
  if (!updatedComment) throw new Error("Comment not found");
  return updatedComment;
};

// Delete a comment function
const deleteComment = async (id: string): Promise<IComment> => {
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) throw new Error("Comment not found");
  return deletedComment;
};

export { getComments, createComment, updateComment, deleteComment };
