import mongoose, { Schema } from "mongoose";

const bankBalanceSchema = new Schema({
    bankBalance : {
        type : String,
        required : true
    },
    bankAccount : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
    },
    bankDetailsId : {
        type : String,
        required : true,
    }
})

export const BankBalance = mongoose.models.BankBalance || mongoose.model("BankBalance",bankBalanceSchema);