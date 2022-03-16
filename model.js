const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema(
    {
        firstName : {type:String,required:true}, 
        lastName:{type:String,required:true},
         email : {type:String,required:true,unique:true},
           age:{type:Number,required:true},
            Pin:{type:String,required:true},
            gender: {
      type: String,
      enum: ["Male", "Female","other"],
      default: "Male",
    },
    },
    {
        versionKey : false,
        timestamps : true,
    }
);

module.exports = mongoose.model("user",UserSchema)