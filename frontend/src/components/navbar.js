import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, LayoutPanelLeft, Gift, Ticket, Users, Store, Power } from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <aside className="min-w-44 max-w-44 p-4 pr-0  py-4 flex flex-col  text-sm  ">
      {[
        { label: "Trang chủ", icon: <LayoutPanelLeft size={16} />, LinkTo: "/" },
        { label: "Phim", icon: <Store size={16} />, LinkTo: "/phim" },
        { label: "Hóa đơn", icon: <Ticket size={16} width={16} height={16} />, LinkTo: "/hoa-don" },
        { label: "Phòng", icon: <LayoutPanelLeft size={16} />, LinkTo: "/phong" },
        { label: "Combo", icon: <Store size={16} />, LinkTo: "/combo" },
        { label: "Vé", icon: <Ticket size={16} />, LinkTo: "/ve" },
        { label: "Ghế", icon: <Store size={16} />, LinkTo: "/ghe_1" },
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
    </aside>
  );
}

export default Navbar;
