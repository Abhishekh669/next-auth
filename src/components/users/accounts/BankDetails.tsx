import Loader from "@/components/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bankdetailtype } from "@/types/bankdetail.types";
import { useDeleteBankDetails } from "@/utils/hooks/mutateHooks/accounts/useDeleteBankDetail";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface DataType {
  data: any;
  isLoading: boolean;
  error: any;
}

function BankDetails({ data, isLoading, error }: DataType) {
  const router = useRouter();
  const { mutate: server_deleteBankDetails } = useDeleteBankDetails();
  if (isLoading) return <Loader />;
  if(  error) return <div className="text-white">no interconneciotn</div>
  if (!data?.data.length && !isLoading && !error)
    return <div className="text-white">No account yet</div>;
  console.log("this is the data in teh bankdetail apage", data?.data);
  if (data?.data && !isLoading && !error)
    return (
      <div className="text-green-600 p-4 flex flex-col gap-y-4">
        <div>Your Accounts :</div>
        <div className="flex flex-col gap-y-4">
          {data &&
            data.data &&
            data.data
              .slice()
              .reverse()
              .map((account: bankdetailtype) => (
                <Card
                  x-chunk="dashboard-01-chunk-0"
                  className=" cursor-pointer  flex flex-col "
                  key={account._id}
                >
                  <CardHeader className="flex flex-row bg-slate-600 items-center justify-between ">
                    <CardTitle className="text-[18px] flex  w-full justify-between font-semibold">
                      {account.bank_name}

                      <div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Trash className="text-red-600"/>
                          </AlertDialogTrigger>
                          <AlertDialogContent className=" w-[90%] md:w-auto bg-black text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[20px]">
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription
                               className="text-[16px]">
                                This action cannot be undone. This will
                                permanently delete your account and  transaction data and  remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-y-2">
                              <AlertDialogCancel className="rounded-[10px]">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="border-[1px] border-white bg-red-500 rounded-[10px]"
                                onClick={() => server_deleteBankDetails({bankDetailsId : account._id})}
                              >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className="border-[1px] border-green-600 p-3"
                    onClick={() => {
                      router.push(`/accounts/${account._id}`);
                    }}
                  >
                    <div>
                      <span className="font-semibold">
                        Head Office : {account.head_office}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Branch</span> :{" "}
                      {account.bank_branch}
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    );
}

export default BankDetails;
