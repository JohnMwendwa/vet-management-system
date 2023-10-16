import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const connectDB = async () => {
  const MONGODB_URL =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URL!
      : process.env.LOCAL_URL!;
  try {
    const conn = await mongoose.connect(MONGODB_URL);

    console.log(`connected to database - ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
