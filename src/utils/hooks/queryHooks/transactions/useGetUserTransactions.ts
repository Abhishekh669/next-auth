import { getTransactionData, getUserTransactions } from "@/actions/user/transactions/transactions";
import { useQuery } from "@tanstack/react-query";

const fetchUserTransactionsData = async (userId : string) =>{
    const response = await getUserTransactions(userId);
    console.log("this is the response in the useGetUserTrasactionsData",response)
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetUserTransactions = (userId : string) =>{
    return useQuery({
        queryKey : ["UserTransactions", userId],
        queryFn : () =>  fetchUserTransactionsData(userId),
    })
}