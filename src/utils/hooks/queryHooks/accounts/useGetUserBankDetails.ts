import { userBankDetail } from "@/actions/user/accounts/bankData";
import { getTransactionData } from "@/actions/user/transactions/transactions";
import { useQuery } from "@tanstack/react-query";

const fetchBankDetails = async (userId : string) =>{
    const response = await userBankDetail(userId);
    console.log("this is the response in the usegetuserbankdetail",response)
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetUserBankDetails = (userId : string) =>{
    return useQuery({
        queryKey : ["getUserBankDetails", userId],
        queryFn : () =>  fetchBankDetails(userId),
    })
}