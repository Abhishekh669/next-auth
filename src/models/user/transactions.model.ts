import { createDecipheriv } from "crypto";
import mongoose, { Schema } from "mongoose";
import { tree } from "next/dist/build/templates/app-page";

// i will need the bankdetails id : to be added 

const transactionSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    bankDetailsId : {
        type : String, 
        required : true,
    },

    name : {
        type : String,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    category: {
        type: String,
        required: true,
    },
    
    createdAt : {
        type :String,
        required : true,
    },
    totalAmount : {
        type : Number,
        required : true
    }

})


export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);