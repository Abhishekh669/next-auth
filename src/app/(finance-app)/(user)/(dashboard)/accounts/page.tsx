import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

function AccountPage() {
  return (
    <div>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:items-center lg:justify-between gap-y-2 lg:flex-row">
          <CardTitle className="text-xl line-clamp-1">Account Page</CardTitle>
          <Button
            size={"sm"}
            className="w-full  text-white bg-gradient-to-t from-[#00D399] to-[#056817]  rounded-[10px] hover:bg-green-500 "
          >
            <Plus className="size-4 mr-2" />
            add new
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}

export default AccountPage;
