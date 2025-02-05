const express = require("express");
const { body, validationResult } = require("express-validator");
const userService = require("../services/userServices");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route - Get user profile (requires authentication)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const newUser = await userService.createUser({ name, email, password });
      return res.status(201).json({ user: newUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Update user by ID (requires authentication)
router.put("/updateUser/:id", authMiddleware, async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
