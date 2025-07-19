import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, LayoutPanelLeft, Gift, Ticket, Users, Store, Power } from "lucide-react";
import Link from "next/link";

// export default function Home() {
//   return (
// //     <div
// //       className="flex  bg-gradient-to-br
// //  from-[#16281d] to-[#665e7e] text-white font-sans pr-4"
// //     >
//       {/* Sidebar */}
//       {/* <aside className="w-44 p-4 pr-0  py-4 flex flex-col  text-sm ">
//         {[
//           { label: "Ticketing", icon: <Ticket size={16} /> },
//           { label: "Concession", icon: <Store size={16} /> },
//           { label: "Gift card", icon: <Gift size={16} /> },
//           { label: "Reservations", icon: <Users size={16} /> },
//           { label: "Shift management", icon: <LayoutPanelLeft size={16} /> },
//         ].map(({ label, icon }, index) => (
//           <button
//             key={label}
//             className={`flex py-8
//              justify-center flex-col bg-white/5 hover:bg-white/20 transition-all
//              duration-500 items-center gap-2 text-left hover:text-purple-300 ${index === 0 && "rounded-t-xl"}
//              ${index === 0 && "bg-white/20"}
//              `}
//           >
//             {icon} <span>{label}</span>
//           </button>
//         ))}

//         <div className=" flex flex-col items-center text-gray-400">
//           <div className="mb-1 flex flex-col items-center py-8">
//             <Users size={20} />
//             <span>PosUser</span>
//           </div>
//           <div>25 Sep 2023</div>
//           <div className="text-white text-2xl font-bold">01:48 am</div>
//           <Button
//             variant="ghost"
//             className="mt-2 w-fit rounded-full hover:text-white flex items-center gap-2 text-red-400 hover:bg-red-400 transition-all duration-300"
//           >
//             <Power size={14} /> Exit
//           </Button>
//         </div>
//       </aside> */}

//       {/* Main Content */}
//       <main className="flex-1 p-4 pr-0">
//         {/* Header */}
//         <div className="flex items-center flex-row-reverse justify-between">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1 text-sm text-gray-300">
//                 <CalendarDays size={16} /> 25 Sep 2023
//               </div>
//               <Button variant="outline" className={"text-black"} size="sm">
//                 Swap view
//               </Button>
//             </div>
//           </div>
//           <Link href={"phim"}> bấm để tới trang phim</Link>
//           {/* Top Navigation Tabs */}
//           <div className="flex gap-4 mb-6 bg-white/5 p-2">
//             {["Today", "Tomorrow", "Monday", "Tuesday", "Wednesday"].map((day, idx) => (
//               <div
//                 key={day}
//                 className={`text-sm min-w-[100px] text-center px-4 py-2
//                hover:bg-white/20 rounded-sm cursor-pointer ${idx === 0 && "bg-white/20"} `}
//               >
//                 <div>{day}</div>
//                 <div className="text-xs text-gray-300">{14 + idx} Jul</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Movies Grid */}
//         <div className="grid grid-cols-3 gap-4">
//           {Array.from({ length: 10 }).map((_, i) => (
//             <Card key={i} className=" p-4 bg-[rgba(255,255,255,0.05)]  py-5 h-[250px] flex gap-3 border-none">
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3NyUc9Xil9i2BqMmmj88DdJ8oBNuGrzEVJQ&s"
//                 alt="Movie poster"
//                 // width={250}
//                 // height={360}
//                 className="rounded-md mb-2 object-cover max-w-[280px] h-full "
//               />
//               <div className="text-white flex flex-col justify-between w-full">
//                 <div className="text-sm p-2 px-4 w-fit rounded-full border border-white text-center font-medium">
//                   Screen 1
//                 </div>
//                 <div className="text-lg font-semibold">The Northman</div>
//                 <div>
//                   <div className="text-3xl">09:00 am </div>
//                   <div className="text-sm text-gray-400 mt-1">( 09:00 am - 11:00 am ) </div>
//                 </div>
//                 <div className="mt-2">
//                   <div className="w-full h-2 bg-gray-700 rounded-full">
//                     <div
//                       className="h-full bg-purple-500 rounded-full w-full"
//                       style={{ width: `${(70 / 80) * 100}%` }}
//                     />
//                   </div>
//                   <div className="text-xs text-purple-400 my-1">70/80 seats available</div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </main>
//     {/* </div> */}
//   );
// }
export default function Home() {
  const phimId = 10;
  return (
    <main className="flex-1 p-4 pr-0">
      {/* Header */}
      <div className="flex items-center flex-row-reverse justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <CalendarDays size={16} /> 25 Sep 2023
            </div>
            <Button variant="outline" className={"text-black"} size="sm">
              Swap view
            </Button>
          </div>
        </div>
        <Link href={"phim"}> bấm để tới trang phim</Link>
        {/* Top Navigation Tabs */}
        <div className="flex gap-4 mb-6 bg-white/5 p-2">
          {["Today", "Tomorrow", "Monday", "Tuesday", "Wednesday"].map((day, idx) => (
            <div
              key={day}
              className={`text-sm min-w-[100px] text-center px-4 py-2 
               hover:bg-white/20 rounded-sm cursor-pointer ${idx === 0 && "bg-white/20"} `}
            >
              <div>{day}</div>
              <div className="text-xs text-gray-300">{14 + idx} Jul</div>
            </div>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className=" p-4 bg-[rgba(255,255,255,0.05)]  py-5 h-[250px] flex gap-3 border-none">
            <Link href={`/suat-chieu-2?id=${phimId}`}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3NyUc9Xil9i2BqMmmj88DdJ8oBNuGrzEVJQ&s"
                alt="Movie poster"
                // width={250}
                // height={360}
                className="rounded-md mb-2 object-cover max-w-[280px] h-full "
              />
              <div className="text-white flex flex-col justify-between w-full">
                <div className="text-sm p-2 px-4 w-fit rounded-full border border-white text-center font-medium">
                  Screen 1
                </div>
                <div className="text-lg font-semibold">The Northman</div>
                <div>
                  <div className="text-3xl">09:00 am </div>
                  <div className="text-sm text-gray-400 mt-1">( 09:00 am - 11:00 am ) </div>
                </div>
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full w-full"
                      style={{ width: `${(70 / 80) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-purple-400 my-1">70/80 seats available</div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
