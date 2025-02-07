import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import authMiddleware from "../middleware/authMiddleware";
import { getUserById, createUser, updateUser } from "../services/userServices";

const router = express.Router();

// 🟢 Get User Profile (Protected Route)
router.get(
  "/profile",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await getUserById((req as any).user.id); // Extract user ID from auth middleware
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

// 🔵 Create a New User
router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
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
      const { name, email, password } = req.body;
      const newUser = await createUser({ name, email, password });
      res.status(201).json({ user: newUser });
    } catch (error) {
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

// 🟠 Update User by ID (Protected Route)
router.put(
  "/updateUser/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ error: "User not found or update failed" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
);

export default router;
