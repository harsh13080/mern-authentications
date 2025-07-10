// import express, { Router } from "express"
// import { signUp,logIn,logOut } from "../controllers/auth.controller.js"
// import { upload } from "../middleware/multer.js"

// const authRouter = express(Router)


// authRouter.post("/signup", upload.single("profileImage"), signUp)
// authRouter.post("/login",logIn)
// authRouter.post("/logout",logOut)


// export default authRouter


import express, { Router } from "express"
import { signUp, logIn, logOut ,getUserData } from "../controllers/auth.controller.js"
import { upload } from "../middleware/multer.js"
import { checkAuth } from "../middleware/checkAuth.js"

// ✅ FIXED router initialization
const authRouter = Router()

// ✅ Routes
authRouter.post("/signup", upload.single("profileImage"), signUp)
authRouter.post("/login", logIn)
authRouter.post("/logout", logOut)
authRouter.get("/getuserdata", checkAuth,getUserData)

export default authRouter
