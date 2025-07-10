import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import uploadOnCloudinary from "../config/cloudinary.js"


export const signUp = async (req, res) => {
  try {

    const { firstName, lastName, userName, email, password } = req.body
    

    
    
    
    //note: 2 step nhi bhe j hai 
    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: "send all details" })
    }
    
    //note: image to frontend on


let profileImage;
if(req.file){
  profileImage =  await uploadOnCloudinary(req.file.path)
}



    //note: image to frontend og

    let exitUser = await User.findOne({ email })
    if (exitUser) {
      return res.status(400).json({ message: "user already exits" })
    }




    //note:3 then password hash bcrypt js package
    const hassedPassword = await bcrypt.hash(password, 10)


    //create user 
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hassedPassword,
      profileImage
    })

    //note:3 then password hash bcrypt js package closed



    // note: 4 step yha se chl ===>
    //console.log(user) // note: che token console

    let token = generateToken(user._id)
    res.cookie("token", token, {
      httpOnly: true, //note: inspect krke nhi dekh skte js ke acces ko privent krta hai
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 //millisecond in 7d convert  next => then download  cookie-parser package
    }) // set token cookie in br



    return res.status(201).json({
      user: {
        firstName,
        lastName,
        userName,
        email,
        profileImage
      } 
    })




  } catch (err) {
    return res.status(500).json({ message: "internal server error" })
  }

}




//note: login functions


export const logIn = async (req, res) => {
  try {
    //note:  1 check user exist or not
    const { email, password } = req.body
    const existUser = await User.findOne({ email })

    if (!existUser) {
      return res.status(400).json({ message: "invalid email user does not exits" })
    }

    //note:2 check password match or not
    const isMatch = await bcrypt.compare(password, existUser.password)
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password please check your password" })
    }


    //note:3 generate token
    let token = generateToken(existUser._id)
    res.cookie("token", token, {
      httpOnly: true, //note: inspect krke nhi dekh skte js ke acces ko privent krta hai
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 //millisecond in 7d convert  next => then download  cookie-parser package
    })

    //note: 4 return user data successfully login
    return res.status(200).json({
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        userName: existUser.userName,
        email: existUser.email,
        profileImage:existUser.profileImage


      }
    })






  } catch (err) {
    return res.status(500).json({ message: "internal server error" })
  }
}

//note: logout user


export const logOut = async (req, res) =>{

try{
  res.clearCookie("token")
  return res.status(200).json({ message: "logout successfully" })

}catch(err){
  return res.status(500).json({ message: "Internal server error" })
}

}


//get data in frontend console

export const getUserData = async(req,res)=>{
  try{

    let userId = req.userId
    if(!userId){
      return res.st(400).json({message:"userid is not found"})
    }

    let user = await User.findById(userId)
    if(!user){
      return res.status(400).json({message:"user is not found"})
    }
    return res.status(200).json(user)

  }catch(err){
return res.status(500).json({message:err})
  }
}