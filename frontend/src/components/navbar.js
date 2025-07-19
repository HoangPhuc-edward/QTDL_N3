import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, LayoutPanelLeft, Gift, Ticket, Users, Store, Power } from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <aside className="min-w-44 max-w-44 p-4 pr-0  py-4 flex flex-col  text-sm overflow-y-auto max-h-[100vh]">
      {[
        { label: "Trang chủ cho nhân viên bán", icon: <Ticket size={16} />, LinkTo: "/" },
        { label: "Phim thêm sửa xóa", icon: <Store size={16} />, LinkTo: "/phim" },
        { label: "Suất chiếu 1", icon: <Gift size={16} />, LinkTo: "/suat-chieu-1" },
        { label: "Hóa đơn", icon: <Users size={16} />, LinkTo: "/hoa-don" },
        { label: "Phòng", icon: <Users size={16} />, LinkTo: "/phong" },
        { label: "Vé", icon: <LayoutPanelLeft size={16} />, LinkTo: "/ve" },
      ].map(({ label, icon, LinkTo }, index) => (
        <Link
          href={LinkTo}
          key={label}
          className={`flex py-8 
             justify-center flex-col px-2 line-clamp-1  bg-white/5 hover:bg-white/20 transition-all 
             duration-500 items-center gap-2 text-left hover:text-purple-300 ${index === 0 && "rounded-t-xl"}
             ${index === 0 && "bg-white/20"}
             `}
        >
          {icon} <span>{label}</span>
        </Link>
      ))}

      <div className=" flex flex-col items-center text-gray-400">
        <div className="mb-1 flex flex-col items-center py-8">
          <Users size={20} />
          <span>PosUser</span>
        </div>
        <div>25 Sep 2023</div>
        <div className="text-white text-2xl font-bold">01:48 am</div>
        <Button
          variant="ghost"
          className="mt-2 w-fit rounded-full hover:text-white flex items-center gap-2 text-red-400 hover:bg-red-400 transition-all duration-300"
        >
          <Power size={14} /> Exit
        </Button>
      </div>
    </aside>
  );
}

export default Navbar;
