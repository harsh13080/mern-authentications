import multer from "multer"

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "./public") //call back kha photo save krna hai 
  },
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,file.originalname)
  }
})

export const upload = multer({storage})