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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// Create a new user function
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.create(userData);
    }
    catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
});
exports.createUser = createUser;
// Get all users function
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.find();
    }
    catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID function
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId);
        if (!user)
            throw new Error("User not found");
        return user;
    }
    catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
});
exports.getUserById = getUserById;
// Update a user function
const updateUser = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser)
            throw new Error("User not found");
        return updatedUser;
    }
    catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
});
exports.updateUser = updateUser;
// Delete a user function
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(userId);
        if (!deletedUser)
            throw new Error("User not found");
        return deletedUser;
    }
    catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
