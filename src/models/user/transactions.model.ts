import mongoose, { Schema } from "mongoose";
const subCategorySchema = new Schema({
    name : {type : String, required : true},

})
const transactionSchema = new Schema({
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
    category : [
        {
            health : [subCategorySchema],
            investment : [subCategorySchema],
            household : [subCategorySchema],
            transportation : [subCategorySchema],
            expenses : [subCategorySchema],
            others  : [subCategorySchema]
        }
    ]

})