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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const mongoose_1 = __importDefault(require("mongoose"));
// Get all posts function
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Post_1.default.find().populate("author", "name email").lean().exec();
    }
    catch (error) {
        throw new Error(`Error fetching posts: ${error.message}`);
    }
});
exports.getPosts = getPosts;
// Create a new post function
const createPost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author } = postData;
        if (!title || !content || !author)
            throw new Error("All fields are required");
        const newPost = new Post_1.default({
            title,
            content,
            author: new mongoose_1.default.Types.ObjectId(author),
        });
        yield newPost.save();
        return newPost;
    }
    catch (error) {
        throw new Error(`Error creating post: ${error.message}`);
    }
});
exports.createPost = createPost;
// Update an existing post function
const updatePost = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield Post_1.default.findByIdAndUpdate(id, updateData, { new: true }).lean().exec();
        if (!updatedPost)
            throw new Error("Post not found");
        return updatedPost;
    }
    catch (error) {
        throw new Error(`Error updating post: ${error.message}`);
    }
});
exports.updatePost = updatePost;
// Delete a post function
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield Post_1.default.findByIdAndDelete(id).exec();
        if (!deletedPost)
            throw new Error("Post not found");
        return deletedPost;
    }
    catch (error) {
        throw new Error(`Error deleting post: ${error.message}`);
    }
});
exports.deletePost = deletePost;
