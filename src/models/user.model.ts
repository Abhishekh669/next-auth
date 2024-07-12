import mongoose from "mongoose"



const userSchema = new mongoose.Schema({
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
        require : true,
        type : String,
    },


})

export const User = mongoose.models.User || mongoose.model("User",userSchema);