import { Card } from "@/components/ui/card";
import { formatTo12Hour, getEndTime } from "@/lib/utils";
import Link from "next/link";

// CREATE TABLE PHIM (
//     MaPhim INT AUTO_INCREMENT PRIMARY KEY,
//     TenPhim VARCHAR(255),
//     TheLoai VARCHAR(255),
//     DaoDien VARCHAR(255),
//     ThoiLuong INT,
//     NgayKhoiChieu DATE,
//     NgayKetThuc DATE,
//     DoTuoi INT,
//     TrangThai INT NOT NULL DEFAULT 1
// );

function CardPhim({ item, ngay, seens }) {
  return (
    <Link href={`/suat-chieu-2?id=${item.MaPhim}&ngay=${ngay}`}>
      <Card className=" p-4 bg-[rgba(255,255,255,0.05)]  py-5 h-[250px] flex gap-3 border-none">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3NyUc9Xil9i2BqMmmj88DdJ8oBNuGrzEVJQ&s"
          alt="Movie poster"
          className="rounded-md mb-2 object-cover max-w-[280px] h-full "
        />
        <div className="text-white flex flex-col justify-between w-full">
          <div className="text-sm p-2 px-4 w-fit rounded-full border border-white text-center font-medium">
            {item.DoTuoi}+
          </div>
          <div className="text-lg font-semibold">{item.TenPhim}</div>
          <div>
            <div className="text-3xl">{formatTo12Hour(item.GioChieu)} </div>
            <div className="text-sm text-gray-400 mt-1">
              ( {formatTo12Hour(item.GioChieu)} - {getEndTime(item.GioChieu, item.ThoiLuong)} ){" "}
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div className="h-full bg-purple-500 rounded-full w-full" style={{ width: `${(80 / 80) * 100}%` }} />
            </div>
            <div className="text-xs text-purple-400 my-1">Còn {seens[[item.MaPhim]]} suất chiếu</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default CardPhim;
