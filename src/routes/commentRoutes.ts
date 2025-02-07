import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import authMiddleware from "../middleware/authMiddleware";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../services/commentServices";

const router = express.Router();

// 🟢 Get all comments (Public route)
router.get(
  "/getComments",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const comments = await getComments();
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

// 🔵 Create a new comment (Protected route)
router.post(
  "/createComment",
  authMiddleware,
  [
    body("content").notEmpty().withMessage("Content is required"),
    body("postId").notEmpty().withMessage("Post ID is required"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // ✅ Ensure function exits after sending response
    }

    const { content, postId } = req.body;

    try {
      const newComment = await createComment({
        content,
        author: (req as any).user.id, // Assign authenticated user's ID as author
        postId,
      });
      res.status(201).json({ comment: newComment });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

// 🟡 Update a comment (Protected route)
router.put(
  "/updateComment/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedComment = await updateComment(req.params.id, req.body);
      if (!updatedComment) {
        res.status(404).json({ error: "Comment not found" });
        return;
      }
      res.status(200).json({ comment: updatedComment });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

// 🔴 Delete a comment (Protected route)
router.delete(
  "/deleteComment/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedComment = await deleteComment(req.params.id);
      if (!deletedComment) {
        res.status(404).json({ error: "Comment not found" });
        return;
      }
      res.status(200).json({ message: "Comment deleted successfully", deletedComment });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

export default router;
