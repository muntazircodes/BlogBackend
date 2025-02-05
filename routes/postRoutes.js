const express = require("express");
const { body, validationResult } = require("express-validator");
const postService = require("../services/postServices");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all posts (Public route)
router.get("/getPosts", async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Create a new post (Requires authentication)
router.post(
  "/createPost",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    try {
      const newPost = await postService.createPost({
        title,
        content,
        author: req.user.id, // Assigning the authenticated user's ID as the author
      });
      return res.status(201).json({ post: newPost });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Update a post (Requires authentication)
router.put("/updatePost/:id", authMiddleware, async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
