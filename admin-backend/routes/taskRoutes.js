import express from "express";
import Task from "../models/Task.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get All Tasks

router.get(
  "/",
  protect,
  async (req, res) => {
    try {

      const tasks =
        await Task.find()
          .populate(
            "assignedTo",
            "name email"
          );

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

// Get Single Task

router.get(
  "/:id",
  protect,
  async (req, res) => {
    try {

      const task =
        await Task.findById(
          req.params.id
        ).populate(
          "assignedTo",
          "name email"
        );

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

// Create Task

router.post(
  "/",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const {
        title,
        description,
        assignedTo,
        status
      } = req.body;

      const task =
        await Task.create({
          title,
          description,
          assignedTo,
          status
        });

      res.status(201).json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

// Update Task

router.put(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const {
        title,
        description,
        assignedTo,
        status
      } = req.body;

      const task =
        await Task.findByIdAndUpdate(
          req.params.id,
          {
            title,
            description,
            assignedTo,
            status
          },
          {
            new: true
          }
        );

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

// Delete Task

router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Task deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

export default router;