import { Button } from "@/components/ui/button";
import { Power, Users } from "lucide-react";

function User() {
  return (
    <div className=" flex  items-center text-gray-400">
      <div className=" flex  items-center">
        <Users size={20} className="mr-1" />
        <span>PosUser</span>
      </div>
      <Button
        variant="ghost"
        className=" w-fit rounded-full hover:text-white flex items-center gap-2 text-red-400 hover:bg-red-400 transition-all duration-300"
      >
        <Power size={14} /> Exit
      </Button>
    </div>
  );
}

export default User;
