"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComments = void 0;
const Comment_1 = __importDefault(require("../models/Comment")); // Fixed Import
const mongoose_1 = __importDefault(require("mongoose"));
// Get all comments function
const getComments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Comment_1.default.find().populate("author", "name email").populate("post").lean();
});
exports.getComments = getComments;
// Create a new comment function
const createComment = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, author, postId } = commentData;
    if (!content || !author || !postId)
        throw new Error("All fields are required");
    const newComment = new Comment_1.default({
        content,
        author: new mongoose_1.default.Types.ObjectId(author),
        post: new mongoose_1.default.Types.ObjectId(postId),
    });
    yield newComment.save();
    return newComment;
});
exports.createComment = createComment;
// Update an existing comment function
const updateComment = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedComment = yield Comment_1.default.findByIdAndUpdate(id, updateData, { new: true, lean: true });
    if (!updatedComment)
        throw new Error("Comment not found");
    return updatedComment;
});
exports.updateComment = updateComment;
// Delete a comment function
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedComment = yield Comment_1.default.findByIdAndDelete(id);
    if (!deletedComment)
        throw new Error("Comment not found");
    return deletedComment;
});
exports.deleteComment = deleteComment;
