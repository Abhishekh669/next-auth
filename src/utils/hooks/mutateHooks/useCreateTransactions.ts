// import { createStudent } from "@/lib/actions/student-actions/create.student.action";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// export const useCreateStudent = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createStudent,
//     onSuccess: () => {
//       toast.success("Student created successfully")
//       queryClient.invalidateQueries({ queryKey: ['adminData'] })
//     },
//     onError: () => { },
//     onSettled: () => { },
//     onMutate: () => { },
// })
// }


import { createTransactions } from "@/actions/user/transactions/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateTransactions = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTransactions,
        onSuccess : () =>{
            toast.success("Transaction created sucessfully")
            queryClient.invalidateQueries({queryKey : ['allTransactions']})
            
        },
        onError : () =>{},
        onSettled : () =>{},
        onMutate : () => {},
    })
}