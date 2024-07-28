"use server";

import { BankDetail } from "@/models/user/bankdetails.model";
import { FieldValues } from "react-hook-form";

export async function createBank(data: FieldValues) {
    console.log("this is the data in the bank details", data);

    try {
        // Check if a bank detail already exists with the same bank_name and bank_branch
        const existingBankDetail = await BankDetail.findOne({
            bank_name: data.bank_name,
            bank_branch: data.bank_branch
        });

        if (existingBankDetail) {
            // If a matching bank detail is found, return an error or handle accordingly
            console.log("Bank detail already exists");
            return {
                error: "Bank detail already exists"
            };
        }

        // If no existing bank detail found, create a new one
        const newBankDetail = new BankDetail(data);
        const savedNewBankDetail = await newBankDetail.save();

        if (!savedNewBankDetail) {
            return {
                error: "Failed to create the bank detail"
            };
        }

        console.log("Successfully created bank detail:", savedNewBankDetail);

        return {
            message: "Successfully created bank detail",
            data: null
        };

    } catch (error) {
        console.error("Failed to create the bank detail:", error);
        return {
            error: "Failed to create the bank detail"
        };
    }
}



export async function userBankDetail(userId : string){
        try {
                const bankDetails = await BankDetail.find({userId});
                console.log("this is the bank detail in teh back end",bankDetails)
                if(!bankDetails){
                    return {
                        error : "No any account found"
                    }
                }
                return {
                    message : "successfully found the data",
                    data : JSON.stringify(bankDetails)
                }
           
        } catch (error) {
            return {error : "Failed to get the user"}
            
        }

}