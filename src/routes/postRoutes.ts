import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/postServices"; 
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// 🟢 Get all posts (Public)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 🔵 Create a new post (Protected)
router.post(
  "/",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const newPost = await createPost({
        ...req.body,
        author: (req as any).user.id, // Ensure author is set from authenticated user
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// 🟡 Update a post (Protected)
router.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    if (!updatedPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 🔴 Delete a post (Protected)
router.delete("/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost = await deletePost(req.params.id);
    if (!deletedPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
