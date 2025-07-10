import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require:true
  },
  lastName:{
    type: String,
    require:true
  },

  userName:{
    type: String,
    require:true,
    unique:true

  },
  email:{
     type: String,
    require:true,
    unique:true
  },

  password:{
     type: String,
    require:true,
    unique:false

  },

  profileImage:{
    type:String,
    require:false

  }

}, { timestamps: true })



const User = mongoose.model("User", userSchema)


export default User