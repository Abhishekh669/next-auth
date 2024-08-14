"use server";

import { auth } from "@/auth";
import TransactionBankDetail from "@/components/users/transaction/TransactionBankDetail";
import { BankBalance } from "@/models/user/bankbalance";
import { BankDetail } from "@/models/user/bankdetails.model";
import { Transaction } from "@/models/user/transactions.model";
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



export async function deleteBankDetails( {bankDetailsId } : {bankDetailsId : string}){
    console.log("this is the data to be deleted ", bankDetailsId)
    try {
        const bankDetails = await BankDetail.findById({_id : bankDetailsId})
        if(!bankDetails){
            return {
                message : "No such bank found",
                data : null
            }
        }
        const  deleteBankDetails = await BankDetail.findByIdAndDelete({_id : bankDetailsId})
        if(!deleteBankDetails){
            return {
                error : "Failed to delete the bank details"
            }
        }
        const transactionWithBankDetailsId = await Transaction.find({bankDetailsId : bankDetailsId})

        if(!transactionWithBankDetailsId){
            return  {
                message : "Transacton Bank Detail is empty",
                data : null
            }
        }

        const  deleteTransactionWithBankDetails = await Transaction.deleteMany({bankDetailsId : bankDetailsId}) 
        if(!deleteTransactionWithBankDetails){
            return {message : "Failed to delete the transaction section", data : null}

        }

        return {
            message : "Successfully deleted all the transaciton and the bank details", data : null
            
        }
    } catch (error) {
        return {error: "Failed to delete the data "}
        
    }
    
}


export async function createBankBalance(data : any){
    console.log("this isthe data in t back end of the bank data",data)
    try {
        const newBankBalance = new BankBalance(data)
        const savedBankBalance = await newBankBalance.save()
        console.log("this is the bank details ", savedBankBalance)
        if(!savedBankBalance)return {
            message : "failed to create the bank balance",
            data : null

        }
        return {
            message : "Successfully created bank balance",
            data : JSON.stringify(savedBankBalance)
        }
    } catch (error) {
        return {
            error : "Failed to create the bank balance "
        }
        
    }

}


export async function  getBankBalance(data: any){
    console.log("this is the data fro mtegh get bank balance ", data )
    try {
        const bankbalance = await BankBalance.find({userId : data.userId, bankDetailsId : data.bankDetailsId})
        if(!bankbalance){return {
            message : "No data ",
            data : null
        }}
        console.log("i think i got data",  bankbalance)
        return {
            message : "successfully get data",
            data : JSON.stringify(bankbalance)
        }
    } catch (error) {
        return {
            error : "Failed to get the bank balance"
        }
        
    }
}