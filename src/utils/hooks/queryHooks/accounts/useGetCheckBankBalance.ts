import { checkBankBalanceData, getBankInfo, userBankDetail } from "@/actions/user/accounts/bankData";
import { useQuery } from "@tanstack/react-query";

const fetchCheckBankBalance = async (data : {userId : string, bankDetailsId : string}) =>{
    const response = await checkBankBalanceData(data);
    console.log("this is the response in the usergetbankbalance",response)
    return {
        message : response.message,
        data : JSON.parse(response.data as string)
    };
}

export const useGetCheckBankBalance = (data : {userId : string, bankDetailsId : string}) =>{
    return useQuery({
        queryKey : ["getCheckBankBalance", data],
        queryFn : () => fetchCheckBankBalance(data) ,
    })
}