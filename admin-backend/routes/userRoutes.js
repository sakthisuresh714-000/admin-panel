import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get All Users

router.get(
  "/",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password");

      res.json(users);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Create User

router.post(
  "/",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const {
        name,
        email,
        password,
        role
      } = req.body;

      const exists =
        await User.findOne({
          email
        });

      if (exists) {
        return res.status(400).json({
          message:
            "Email already exists"
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role
        });

      res.status(201).json(user);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Update User

router.put(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const {
        name,
        email,
        role
      } = req.body;

      const updatedUser =
        await User.findByIdAndUpdate(
          req.params.id,
          {
            name,
            email,
            role
          },
          {
            new: true
          }
        );

      res.json(updatedUser);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Delete User

router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted successfully"
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;