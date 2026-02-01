import mongoose from "mongoose";

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log("mongodb connection failed")
  }
};

export default conn;