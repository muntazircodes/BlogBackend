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
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = userData;
    // Check if user exists
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser)
        throw new Error("User already exists");
    // Hash password before saving
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Create new user with hashed password
    const newUser = new User_1.default({ name, email, password: hashedPassword });
    yield newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
// Login User function
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid email or password");
    // Compare hashed passwords
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid email or password");
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
});
exports.loginUser = loginUser;
