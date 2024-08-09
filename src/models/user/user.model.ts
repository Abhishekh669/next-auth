import mongoose, { Schema } from "mongoose"



const userSchema = new Schema({
    username : {
        
        type : String,
        
    },
    name : { 
        type : String,
    },
    email : {
        require : true,
        type : String
    },
    password : {
        type : String,
        required : true
    },


})

export const User = mongoose.models.User || mongoose.model("User",userSchema);