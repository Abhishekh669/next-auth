"use server"
import { connectDB } from "@/lib/connectDB";
import { Transaction } from "@/models/user/transactions.model";


connectDB();

export async function  createTransactions(data :any){
    if(data){
        try {
            console.log("this isthe data of the transaction in the create Transation",data)
            const transData = await new Transaction(data);
            console.log("this is the transData",transData);
            const savedData = await transData.save();
            if(!savedData){
                console.log("iam here")
                return {
                    error : "Failed to create the transaction"
                }
            }
            console.log("this is the saved data",savedData)
            return {
                message : "Successfully created transactions",
            }



        } catch (error) {
            return {
                error : "Failed to create the transatction"
            }
            
        }
    }
}

export async function getTransactions(){
    try {
        const transactions = await Transaction.find();
        if(!transactions){
            return {
                error : "No any transactions fouond"
            }
        }
        return {
            message : "Transaction found successfully",
            data : JSON.stringify(transactions)
        }

        
    } catch (error) {
        return {
            error : "Failed to the retrive the transactions"
        }
        
    }
}


export async function deleteTransaction(transaction: {transactionId : string}) {
        console.log("i am deleted ", transaction)
        try {
            const transData = await Transaction.findByIdAndDelete({_id : transaction.transactionId})
            console.log("thi is the transData",transData)
            if(!transData){
                return {
                    error  :  "No Transaction Found"
                }
            }
            return {
                message : "Transaction deleted successfully"
            }
            
        } catch (error) {
            return {
                error : "Failed to delete the data"
            }
            
        }
    
}