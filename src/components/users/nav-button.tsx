import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
type Props = { 
     href  : string, 
     label : string,
    isActive? : boolean
};
 const NavButton = ({
    href , label, isActive

} : Props) =>{
    return (
      <Button
        asChild
        size="sm"
        variant="outline"
        className={cn(
          "w-full text-black  lg:w-auto justify-between font-normal  hover:text-[#00D399] border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none  focus:bg-white/30 ",
          isActive ? "bg-white/10 text-black" : "bg-transparent"
        )}
      >
        <Link href={href}>{label}</Link>
      </Button>
    );
}
export default NavButton