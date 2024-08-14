import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import React from 'react'
import BankAmount from './BankAmount'
import BankInfo from './BankInfo'
import { useGetBankBalance } from '@/utils/hooks/queryHooks/accounts/useGetBankBalance'

export interface AccountFormType{
  session : any,
  bankDetailsId : string
}
function AccountForm({session, bankDetailsId} : AccountFormType) {

  
 
  return (
    <>
    <Sheet>
      <Card className="border-none drop-shadow-sm text-white">
        <CardHeader className="lg:items-center lg:justify-between gap-y-2 lg:flex-row">
          <CardTitle className="text-xl line-clamp-1">Account Details</CardTitle>
          <SheetTrigger asChild>
            <Button
              size={"sm"}
              className="w-full  text-white bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[10px] hover:bg-green-500 "
            >
              <Plus className="size-4 mr-2" />
              Add Bank
            </Button>
          </SheetTrigger>
        </CardHeader>
      </Card>
      <SheetContent className="bg-black border-l-2 border-l-green-600 text-white flex flex-col gap-y-8 ">
        <SheetHeader>
          <SheetTitle className="text-[24px] ">
            <span className="text-[30px] font-bold bg-gradient-to-t from-[#00D399] to-[#056817] rounded-[5px] bg-clip-text text-transparent filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              Add Bank Detail
            </span>
          </SheetTitle>
        </SheetHeader>
        <BankInfo session={session} bankDetailsId={bankDetailsId} />
      </SheetContent>
     
    </Sheet>


  </>
  )
}

export default AccountForm
