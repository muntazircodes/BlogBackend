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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userServices_1 = require("../services/userServices");
const router = express_1.default.Router();
// 🟢 Get User Profile (Protected Route)
router.get("/profile", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userServices_1.getUserById)(req.user.id); // Extract user ID from auth middleware
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
// 🔵 Create a New User
router.post("/create", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;
        const newUser = yield (0, userServices_1.createUser)({ name, email, password });
        res.status(201).json({ user: newUser });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
// 🟠 Update User by ID (Protected Route)
router.put("/updateUser/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userServices_1.updateUser)(req.params.id, req.body);
        if (!user) {
            res.status(404).json({ error: "User not found or update failed" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
exports.default = router;
