import { getUserData } from "@/actions/user/userData/userData";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async (userId : string) =>{
    const response = await getUserData(userId);
    return response;
}

export const useGetUserData = (userId : string) =>{
    return useQuery({
        queryKey : ["accounts", userId],
        queryFn : () =>  fetchUserData(userId),
    })
}