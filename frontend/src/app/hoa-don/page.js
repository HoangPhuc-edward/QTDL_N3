"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { hoadonAPI } from "@/api-request/hoa-don-api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Label } from "@/components/ui/label";

const exportToExcel = (filteredList) => {
  const ws = XLSX.utils.json_to_sheet(
    filteredList.map((hd) => ({
      "Mã HĐ": hd.MaHD,
      "Ngày lập": hd.NgayMua?.slice(0, 10),
      "Tổng tiền": Number(hd.TongTien).toLocaleString() + "đ",
      "Tên khách hàng": hd.TenKH,
      "Số lượng combo": hd.SoLuongCombo,
      "Mã combo": hd.MaCombo,
      "1 combo giá": hd.GiaCombo,
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "DanhSachHoaDon");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `DanhSachHoaDon_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

export default function HoaDon() {
  const [hoaDonList, setHoaDonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchMaHD, setSearchMaHD] = useState(""); // Added for invoice ID filter
  const [searchName, setSearchName] = useState("");
  const [searchNguoiLap, setSearchNguoiLap] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await hoadonAPI.getHoaDon();
        setHoaDonList(data);
        setFilteredList(data);
      } catch (err) {
        console.error("Lỗi khi lấy hóa đơn:", err);
      }
    };
    fetchAPI();
  }, []);

  const handleFilter = () => {
    const filtered = hoaDonList.filter((hd) => {
      const matchMaHD = searchMaHD.trim() === "" || hd.MaHD.toString().toLowerCase().includes(searchMaHD.toLowerCase());
      const matchName = searchName.trim() === "" || hd.TenKH.toLowerCase().includes(searchName.toLowerCase());
      const matchNguoiLap =
        searchNguoiLap.trim() === "" || hd.HoTenNV.toLowerCase().includes(searchNguoiLap.toLowerCase());
      const matchDate = selectedDate === "" || hd.NgayMua?.slice(0, 10) === selectedDate;

      return matchMaHD && matchName && matchNguoiLap && matchDate;
    });

    setFilteredList(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6  pr-0 w-full">
      <Card className="flex-1">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-orange-500 flex items-center justify-between mb-4">
            <span>DANH SÁCH HÓA ĐƠN</span>
            <Button variant="outline" className="bg-green-500 text-white" onClick={() => exportToExcel(filteredList)}>
              XUẤT FILE EXCEL
            </Button>
          </h2>

          <div className="grid grid-cols-7 gap-2 text-sm font-semibold border-b pb-2">
            <div>Mã HĐ</div>
            <div>Ngày lập</div>
            <div>Tổng tiền</div>
            <div>Tên khách hàng</div>
            <div>Số lượng combo</div>
            <div>Mã combo</div>
            <div>1 combo giá</div>
          </div>

          <ScrollArea className="h-[74vh] pr-2 mt-2">
            {filteredList.length === 0 ? (
              <div className="text-center text-sm mt-4 text-gray-500">Không có dữ liệu</div>
            ) : (
              filteredList.map((hd) => (
                <div key={hd.MaHD} className="grid grid-cols-7 gap-2 text-sm py-1 border-b">
                  <div>{hd.MaHD}</div>
                  <div>{hd.NgayMua?.slice(0, 10)}</div>
                  <div>{Number(hd.TongTien).toLocaleString()}đ</div>
                  <div>{hd.TenKH}</div>
                  <div>{hd.SoLuongCombo}</div>
                  <div>{hd.MaCombo}</div>
                  <div>{hd.GiaCombo}</div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="w-full md:w-[300px] flex flex-col gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">TÌM KIẾM</h2>
            <div className="space-y-4">
              <div>
                <Label>Mã hóa đơn</Label>
                <Input placeholder="Mã hóa đơn" value={searchMaHD} onChange={(e) => setSearchMaHD(e.target.value)} />
              </div>
              <div>
                <Label>Tên khách hàng</Label>
                <Input
                  placeholder="Tên khách hàng"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div>
                <Label>Ngày lập</Label>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button className="w-full" onClick={handleFilter}>
                  TÌM
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setSearchMaHD("");
                    setSearchName("");
                    setSearchNguoiLap("");
                    setSelectedDate("");
                    setFilteredList(hoaDonList);
                  }}
                >
                  XÓA LỌC
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
