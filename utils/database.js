import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
let isConnected = false; //track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    // If we are already connected to the database then we need
    // to return out the function.
    return;
  }
  //Else we setup a connection with the database.
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
