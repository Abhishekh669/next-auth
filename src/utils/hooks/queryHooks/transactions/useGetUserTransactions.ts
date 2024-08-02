import { getTransactionData, getUserTransactions } from "@/actions/user/transactions/transactions";
import { TransBankDetails } from "@/types/bankdetail.types";
import { useQuery } from "@tanstack/react-query";

const fetchUserTransactionsData = async (data : TransBankDetails) =>{
    const response = await getUserTransactions(data);
    console.log("this is the response in the useGetUserTrasactionsData",response)
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetUserTransactions = (data : TransBankDetails) =>{
    return useQuery({
        queryKey : ["UserTransactions", data],
        queryFn : () =>  fetchUserTransactionsData(data),
    })
}