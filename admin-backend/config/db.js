import mongoose from "mongoose";

const connectDB = async () => {

  console.log(
    "MONGO_URI = ",
    process.env.MONGO_URI
  );

  try {
    const conn =
      await mongoose.connect(
        process.env.MONGO_URI
      );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;