import { getBankInfo, userBankDetail } from "@/actions/user/accounts/bankData";
import { getTransactionData } from "@/actions/user/transactions/transactions";
import { useQuery } from "@tanstack/react-query";

const fetchBankInfo = async (data : {userId : string, bankDetailsId : string}) =>{
    const response = await getBankInfo(data);
    console.log("this is the response in the usegetuserbankdetail",response)
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetBankInfo = (data : {userId : string, bankDetailsId : string}) =>{
    return useQuery({
        queryKey : ["getUserBankInfo", data],
        queryFn : () => fetchBankInfo(data) ,
    })
}