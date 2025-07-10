import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB = async () =>{
  try{

    await mongoose.connect(process.env.MONGODB_URL)
    console.log("mongodb connected ✅")

  }catch(err){
    console.log("db not connected 🎗️",err)
  }
}

export default connectDB