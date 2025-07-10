import jwt from "jsonwebtoken"

const generateToken = (id)=>{
  let token =  jwt.sign({id},process.env.JWT_SECRETE,{expiresIn:"7d"})
  return token

}

export default generateToken
//note: sign method ek token genrate krega 