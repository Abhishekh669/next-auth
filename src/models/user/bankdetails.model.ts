import mongoose, { Schema } from "mongoose";

const bankDetailSchema = new Schema({
    bank_name : {
        type : String,
        required : true, 
    },
     bank_branch : {
        type : String,
        required : true,
     }
})

export const BankDetail = mongoose.models.BankDetail || mongoose.model("BankDetail",bankDetailSchema);