import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    email : {
        type : String,
        required : true    
    },
    password : {
        type : String,
        required : true
    }
})


const Admin  = mongoose.models.Admin || mongoose.model("Admin",adminSchema);
export {Admin};