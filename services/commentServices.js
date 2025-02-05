const Comment = require("../models/Comment");

const getComments = async () => {
  return await Comment.find();
};

const createComment = async (commentData) => {
  const { content, author, postId } = commentData;

  if (!content || !author || !postId) throw new Error("All fields are required");

  const newComment = new Comment({ content, author, postId });
  await newComment.save();

  return newComment;
};

const updateComment = async (id, updateData) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedComment) throw new Error("Comment not found");
  return updatedComment;
};

const deleteComment = async (id) => {
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) throw new Error("Comment not found");
  return deletedComment;
};

module.exports = { getComments, createComment, updateComment, deleteComment };
