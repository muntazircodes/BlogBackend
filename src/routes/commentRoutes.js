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
const commentServices_1 = require("../services/commentServices");
const router = express_1.default.Router();
// 🟢 Get all comments (Public route)
router.get("/getComments", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, commentServices_1.getComments)();
        res.status(200).json({ comments });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
// 🔵 Create a new comment (Protected route)
router.post("/createComment", authMiddleware_1.default, [
    (0, express_validator_1.body)("content").notEmpty().withMessage("Content is required"),
    (0, express_validator_1.body)("postId").notEmpty().withMessage("Post ID is required"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // ✅ Ensure function exits after sending response
    }
    const { content, postId } = req.body;
    try {
        const newComment = yield (0, commentServices_1.createComment)({
            content,
            author: req.user.id, // Assign authenticated user's ID as author
            postId,
        });
        res.status(201).json({ comment: newComment });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
// 🟡 Update a comment (Protected route)
router.put("/updateComment/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedComment = yield (0, commentServices_1.updateComment)(req.params.id, req.body);
        if (!updatedComment) {
            res.status(404).json({ error: "Comment not found" });
            return;
        }
        res.status(200).json({ comment: updatedComment });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
// 🔴 Delete a comment (Protected route)
router.delete("/deleteComment/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedComment = yield (0, commentServices_1.deleteComment)(req.params.id);
        if (!deletedComment) {
            res.status(404).json({ error: "Comment not found" });
            return;
        }
        res.status(200).json({ message: "Comment deleted successfully", deletedComment });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
exports.default = router;
