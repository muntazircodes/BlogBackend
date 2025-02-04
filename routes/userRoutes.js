const express = require("express");
const { body, validationResult } = require("express-validator");
const userService = require("../services/userServices");

const router = express.Router();

// GET route to fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST route to create a new user
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

// PUT route to update user by ID
router.put("/updateUser/:id", async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
