import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
dotenv.config()
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const port = process.env.PORT || 4000
const app = express()

app.use(express.json()) //note: req.body ke liye middleware
app.use(cookieParser()) //note: token ko cookie me save kr
app.use(cors({
  origin:"https://mern-authentications-1.onrender.com",
  credentials:true  //frontend me cookie ko access krne ke liye 
})) //note: cors(frontend se connection ke liye ) ke liye middleware
 

app.use("/api",authRouter)







app.listen(port,()=>{
connectDB()
  console.log(`server is running ${port}`)
})
