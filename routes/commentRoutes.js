const express = require("express");
const { body, validationResult } = require("express-validator");
const commentService = require("../services/commentServices");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all comments (Public route)
router.get("/getComments", async (req, res) => {
  try {
    const comments = await commentService.getComments();
    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Create a new comment (Requires authentication)
router.post(
  "/createComment",
  authMiddleware,
  [body("content").notEmpty().withMessage("Content is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;

    try {
      const newComment = await commentService.createComment({
        content,
        author: req.user.id, // Assigning authenticated user's ID as the author
      });
      return res.status(201).json({ comment: newComment });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Update a comment (Requires authentication)
router.put("/updateComment/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await commentService.updateComment(req.params.id, req.body);
    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete a comment (Requires authentication)
router.delete("/deleteComment/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await commentService.deleteComment(req.params.id);
    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
