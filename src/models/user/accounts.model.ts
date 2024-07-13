import mongoose, { Schema, mongo } from "mongoose";

const accountSchema = new Schema({
    userId : 
    [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    title : {
        type : String,

    },
    
})