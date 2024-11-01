import mongoose from "mongoose";

export const connectdb = async () => {
  // await mongoose.connect(process.env.MONGODB_URI, {
  const connt = await mongoose.connect(process.env.MONGODB_URL);
  console.log(`connect is ${connt.connection.host}`);
};
