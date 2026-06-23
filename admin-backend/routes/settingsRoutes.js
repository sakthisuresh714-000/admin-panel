import express from "express";
import Setting from "../models/Setting.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/*
GET SETTINGS
Admin Only
*/

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      let settings = await Setting.findOne();

      if (!settings) {
        settings = await Setting.create({});
      }

      res.json(settings);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/*
UPDATE SETTINGS
Admin Only
*/

router.put(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      let settings = await Setting.findOne();

      if (!settings) {
        settings = await Setting.create(req.body);
      } else {
        settings = await Setting.findByIdAndUpdate(
          settings._id,
          req.body,
          {
            new: true,
          }
        );
      }

      res.json({
        message: "Settings Updated Successfully",
        settings,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;