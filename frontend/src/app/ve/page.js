"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { veAPI } from "@/api-request/ve-api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const formatDateLocal = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 10);
};

const exportToExcel = (filteredList) => {
  const ws = XLSX.utils.json_to_sheet(
    filteredList.map((ve) => ({
      "Mã vé": ve.MaVe,
      "Khách hàng": ve.TenKH,
      Phim: ve.TenPhim,
      "Suất chiếu": `${formatDateLocal(ve.NgayChieu)} - ${ve.GioChieu}`,
      Ghế: ve.MaGhe,
      "Ngày đặt": formatDateLocal(ve.NgayDat),
      "Giá vé": Number(ve.GiaVe).toLocaleString() + "đ",
      "Trạng thái": ve.TrangThaiVe,
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "DanhSachVe");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `DanhSachVe_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

export default function VeList() {
  const [veList, setVeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchMaVe, setSearchMaVe] = useState(""); // Added for ticket ID filter
  const [searchTenKH, setSearchTenKH] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVe, setSelectedVe] = useState(null);
  const [openDialogVeMaVe, setOpenDialogVeMaVe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await veAPI.getAllVe();
        setVeList(data);
        setFilteredList(data);
      } catch (err) {
        console.error("Lỗi khi lấy vé:", err);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = veList.filter((ve) => {
      const matchMaVe = searchMaVe.trim() === "" || ve.MaVe.toString().toLowerCase().includes(searchMaVe.toLowerCase());
      const matchName = searchTenKH.trim() === "" || ve.TenKH.toLowerCase().includes(searchTenKH.toLowerCase());
      const matchDate = selectedDate === "" || ve.NgayDat?.slice(0, 10) === selectedDate;
      return matchMaVe && matchName && matchDate;
    });
    setFilteredList(filtered);
  };

  const handleDeleteVe = async () => {
    if (!selectedVe) return;

    try {
      await veAPI.deleteVe(selectedVe.MaVe, "Đã hủy");

      setFilteredList((prev) =>
        prev.map((ve) => (ve.MaVe === selectedVe.MaVe ? { ...ve, TrangThaiVe: "Đã hủy" } : ve))
      );

      setOpenDialogVeMaVe(null);
      setSelectedVe(null);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái vé:", err);
    }
  };

  return (
    <div className="flex flex-col h-full md:flex-row gap-6  pr-0 w-full">
      <Card className="flex-1">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-orange-500 flex justify-between items-center mb-4">
            <span>DANH SÁCH VÉ</span>
            <Button variant="outline" className="bg-green-500 text-white" onClick={() => exportToExcel(filteredList)}>
              XUẤT FILE EXCEL
            </Button>
          </h2>

          <div className="grid grid-cols-9 gap-2 text-sm font-semibold border-b pb-2">
            <div>Mã vé</div>
            <div>Khách hàng</div>
            <div>Phim</div>
            <div>Suất chiếu</div>
            <div>Ghế</div>
            <div>Ngày đặt</div>
            <div>Giá vé</div>
            <div>Trạng thái</div>
            <div>Hành động</div>
          </div>

          <ScrollArea className="h-[74vh] pr-2 mt-2">
            {filteredList.length === 0 ? (
              <div className="text-center text-sm mt-4 text-gray-500">Không có dữ liệu</div>
            ) : (
              filteredList.map((ve) => (
                <div key={ve.MaVe} className="grid grid-cols-9 gap-2 text-sm py-1 border-b items-center">
                  <div>{ve.MaVe}</div>
                  <div>{ve.TenKH}</div>
                  <div>{ve.TenPhim}</div>
                  <div>
                    {formatDateLocal(ve.NgayChieu)} - {ve.GioChieu}
                  </div>
                  <div>{ve.MaGhe}</div>
                  <div>{formatDateLocal(ve.NgayDat)}</div>
                  <div>{Number(ve.GiaVe).toLocaleString()}đ</div>
                  <div>{ve.TrangThaiVe}</div>
                  <div>
                    {!["Đã hủy", "Đã huỷ"].includes(ve.TrangThaiVe) ? (
                      <Dialog
                        open={openDialogVeMaVe === ve.MaVe}
                        onOpenChange={(isOpen) => {
                          if (isOpen) {
                            setSelectedVe(ve);
                            setOpenDialogVeMaVe(ve.MaVe);
                          } else {
                            setOpenDialogVeMaVe(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Xóa
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Xác nhận hủy vé</DialogTitle>
                            <DialogDescription>
                              Bạn có chắc chắn muốn chuyển vé <strong>{ve.MaVe}</strong> sang trạng thái "Đã hủy"?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="ghost" onClick={() => setOpenDialogVeMaVe(null)}>
                              Hủy
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteVe}>
                              Xác nhận
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        ĐÃ HỦY
                      </Button>
                    )}
                  </div>
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
                <Label>Mã vé</Label>
                <Input placeholder="Mã vé" value={searchMaVe} onChange={(e) => setSearchMaVe(e.target.value)} />
              </div>
              <div>
                <Label>Tên khách hàng</Label>
                <Input
                  placeholder="Tên khách hàng"
                  value={searchTenKH}
                  onChange={(e) => setSearchTenKH(e.target.value)}
                />
              </div>
              {/* <div>
                <Label>Ngày đặt</Label>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div> */}
              <div className="flex gap-2">
                <Button className="w-full" onClick={handleFilter}>
                  TÌM
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setSearchMaVe("");
                    setSearchTenKH("");
                    setSelectedDate("");
                    setFilteredList(veList);
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
