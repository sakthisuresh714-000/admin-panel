import express from "express";
import User from "../models/User.js";
import Task from "../models/Task.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  async (req, res) => {
    try {

      const totalUsers =
        await User.countDocuments();

      const totalTasks =
        await Task.countDocuments();

      const completedTasks =
        await Task.countDocuments({
          status: "Completed"
        });

      const pendingTasks =
        await Task.countDocuments({
          status: "Pending"
        });

      res.json({
        totalUsers,
        totalTasks,
        completedTasks,
        pendingTasks
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

export default router;