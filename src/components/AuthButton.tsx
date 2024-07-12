"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/helper";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";


export default function AuthButton() {
  const session = useSession();
  const router = useRouter();
  return (
    <Button
      className="w-[70px] h-[70px]  rounded-full absolute right-0"
      onClick={async () => {
        const res = await signOut();
        console.log("this is the res in the signout", res);
        router.push("/sign-in");
      }}
    >
      <LogOut className="text-white h-6 w-6 hover:text-red-600  " />
    </Button>
  );
}
