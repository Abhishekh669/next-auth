import { useGetTransactions } from "@/utils/hooks/queryHooks/useGetTransactions"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      totalAmount : 5904
      
    },
    {
      id : "helloworld",
      amount : 3000,
      status : "pending",
      email : "hello@gmail.com",
      totalAmount : 59042
    },
    {
      id : "kxak",
      amount : 3000,
      status : "pending",
      email : "hello@gmail.com",
      totalAmount : 5905
    },
    {
      id : "kxak",
      amount : 3000,
      status : "pending",
      email : "hello@gmail.com",
      totalAmount : 59087
    }
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()
  // const {data, error, isLoading} = useGetTransactions();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
