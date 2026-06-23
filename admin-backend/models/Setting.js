import mongoose from "mongoose";

const settingSchema =
  new mongoose.Schema(
    {
      darkMode: {
        type: Boolean,
        default: false,
      },

      emailVerification: {
        type: Boolean,
        default: true,
      },

      sessionTimeout: {
        type: Number,
        default: 30,
      },
    },
    {
      timestamps: true,
    }
  );

const Setting = mongoose.model(
  "Setting",
  settingSchema
);

export default Setting;