import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { registerUser, loginUser } from "../services/authServices";

const router = express.Router();

// 🟢 Register User
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await registerUser(req.body);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

// 🔵 Login User
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const { token, user } = await loginUser(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

export default router;
