// "use client";

// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { phimAPI } from "@/api-request/phim-api";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { phongAPI } from "@/api-request/phong-api";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const defaultPhim = {
//   MaPhim: null,
//   TenPhim: "",
//   TheLoai: "",
//   DaoDien: "",
//   ThoiLuong: "",
//   NgayKhoiChieu: "",
//   NgayKetThuc: "",
//   DoTuoi: "",
//   img: "",
// };

// const defaultSuatChieu = {
//   MaSC: null,
//   MaPhong: "",
//   NgayChieu: "",
//   GioChieu: "",
//   GiaNguoiLon: "",
//   GiaTreEm: "",
// };

// // Utility to format date to YYYY-MM-DD
// const formatDateToLocal = (utcDateString) => {
//   if (!utcDateString) return "";
//   const date = new Date(utcDateString); // Parses UTC date
//   // Check if the date is valid
//   if (isNaN(date.getTime())) return "";
//   return date.toLocaleDateString("en-CA"); // Returns YYYY-MM-DD in local timezone
// };

// // Utility to normalize local date to UTC YYYY-MM-DD
// const normalizeToUTC = (dateString) => {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split("T")[0];
// };

// export default function DanhSachPhim() {
//   const [phimList, setPhimList] = useState([]);
//   const [filteredList, setFilteredList] = useState([]);
//   const [searchName, setSearchName] = useState("");
//   const [searchTheLoai, setSearchTheLoai] = useState(""); // Added for genre filter
//   const [searchDaoDien, setSearchDaoDien] = useState(""); // Added for director filter
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [form, setForm] = useState(defaultPhim);
//   const [suatChieuList, setSuatChieuList] = useState([defaultSuatChieu]);
//   const [phongList, setPhongList] = useState([]);
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [confirmDeleteSuatChieuOpen, setConfirmDeleteSuatChieuOpen] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     fetchPhimList();
//   }, []);

//   const fetchPhimList = async () => {
//     try {
//       const data = await phimAPI.getAllPhim();
//       const phong = await phongAPI.getAllPhong();
//       setPhimList(data);
//       setFilteredList(data);
//       setPhongList(phong);
//     } catch (err) {
//       console.error("Lỗi khi lấy danh sách phim hoặc phòng:", err);
//       toast.error("Không thể tải danh sách phim hoặc phòng");
//     }
//   };

//   const handleFilter = () => {
//     const filtered = phimList.filter((phim) => {
//       const matchesName = searchName.trim() === "" || phim.TenPhim.toLowerCase().includes(searchName.toLowerCase());
//       const matchesTheLoai =
//         searchTheLoai.trim() === "" || phim.TheLoai.toLowerCase().includes(searchTheLoai.toLowerCase());
//       const matchesDaoDien =
//         searchDaoDien.trim() === "" || phim.DaoDien.toLowerCase().includes(searchDaoDien.toLowerCase());
//       return matchesName && matchesTheLoai && matchesDaoDien;
//     });
//     setFilteredList(filtered);
//   };

//   const handleAddSuatChieu = () => {
//     setSuatChieuList([...suatChieuList, defaultSuatChieu]);
//   };

//   const handleSuatChieuChange = (index, field, value) => {
//     const updatedList = suatChieuList.map((sc, i) =>
//       i === index
//         ? {
//             ...sc,
//             [field]: field === "NgayChieu" ? normalizeToUTC(value) : value,
//           }
//         : sc
//     );
//     setSuatChieuList(updatedList);
//   };

//   const handleRemoveSuatChieu = (index) => {
//     setDeleteIndex(index);
//     setConfirmDeleteSuatChieuOpen(true);
//   };

//   const confirmRemoveSuatChieu = () => {
//     if (deleteIndex !== null) {
//       setSuatChieuList(suatChieuList.filter((_, i) => i !== deleteIndex));
//       setDeleteIndex(null);
//     }
//     setConfirmDeleteSuatChieuOpen(false);
//   };

//   const cancelRemoveSuatChieu = () => {
//     setDeleteIndex(null);
//     setConfirmDeleteSuatChieuOpen(false);
//   };

//   const handleEdit = async (phim) => {
//     try {
//       const filmData = await phimAPI.getById(phim.MaPhim);
//       setForm({
//         MaPhim: filmData.phim.MaPhim,
//         TenPhim: filmData.phim.TenPhim || "",
//         TheLoai: filmData.phim.TheLoai || "",
//         DaoDien: filmData.phim.DaoDien || "",
//         ThoiLuong: filmData.phim.ThoiLuong?.toString() || "",
//         NgayKhoiChieu: formatDateToLocal(filmData.phim.NgayKhoiChieu) || "",
//         NgayKetThuc: formatDateToLocal(filmData.phim.NgayKetThuc) || "",
//         DoTuoi: filmData.phim.DoTuoi?.toString() || "",
//         img: filmData.phim.img || "",
//       });
//       setSuatChieuList(
//         filmData.suatChieu.length > 0
//           ? filmData.suatChieu.map((sc) => ({
//               MaSC: sc.MaSC,
//               MaPhong: sc.MaPhong.toString(),
//               NgayChieu: formatDateToLocal(sc.NgayChieu),
//               GioChieu: sc.GioChieu.slice(0, 5),
//               GiaNguoiLon: sc.GiaNguoiLon.toString(),
//               GiaTreEm: sc.GiaTreEm.toString(),
//             }))
//           : [defaultSuatChieu]
//       );
//       setDialogOpen(true);
//     } catch (err) {
//       toast.error("Lỗi khi tải thông tin phim để sửa");
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (!form.TenPhim || !form.NgayKhoiChieu || !form.NgayKetThuc) {
//         toast.error("Vui lòng điền đầy đủ thông tin bắt buộc của phim (Tên phim, Ngày khởi chiếu, Ngày kết thúc)");
//         return;
//       }

//       for (const sc of suatChieuList) {
//         if (!sc.MaPhong || !sc.NgayChieu || !sc.GioChieu || !sc.GiaNguoiLon || !sc.GiaTreEm) {
//           toast.error("Vui lòng điền đầy đủ thông tin suất chiếu");
//           return;
//         }
//       }

//       const normalizedForm = {
//         ...form,
//         NgayKhoiChieu: normalizeToUTC(form.NgayKhoiChieu),
//         NgayKetThuc: normalizeToUTC(form.NgayKetThuc),
//       };
//       const normalizedSuatChieuList = suatChieuList.map((sc) => ({
//         ...sc,
//         NgayChieu: normalizeToUTC(sc.NgayChieu),
//       }));

//       if (form.MaPhim) {
//         await phimAPI.updatePhim({ phimData: normalizedForm, SuatChieu: normalizedSuatChieuList });
//         toast.success("Cập nhật phim thành công");
//       } else {
//         await phimAPI.createPhim({ phimData: normalizedForm, SuatChieu: normalizedSuatChieuList });
//         toast.success("Thêm phim và suất chiếu thành công");
//       }

//       setForm(defaultPhim);
//       setSuatChieuList([defaultSuatChieu]);
//       setDialogOpen(false);
//       fetchPhimList();
//     } catch (err) {
//       toast.error(`Lỗi khi lưu phim hoặc suất chiếu: ${err.message}`);
//     }
//   };

//   const handleDelete = (id) => {
//     setDeleteId(id);
//     setConfirmDeleteOpen(true);
//   };

//   const confirmDeletePhim = async () => {
//     if (deleteId !== null) {
//       try {
//         await phimAPI.deletePhim(deleteId);
//         toast.success("Đã ẩn phim");
//         fetchPhimList();
//       } catch (err) {
//         toast.error("Xóa thất bại");
//       }
//     }
//     setDeleteId(null);
//     setConfirmDeleteOpen(false);
//   };

//   const cancelDeletePhim = () => {
//     setDeleteId(null);
//     setConfirmDeleteOpen(false);
//   };

//   const exportToExcel = (list) => {
//     const ws = XLSX.utils.json_to_sheet(
//       list.map((phim) => ({
//         "Mã phim": phim.MaPhim,
//         "Tên phim": phim.TenPhim,
//         "Thể loại": phim.TheLoai,
//         "Đạo diễn": phim.DaoDien,
//         "Thời lượng": phim.ThoiLuong,
//         "Ngày khởi chiếu": formatDateToLocal(phim.NgayKhoiChieu),
//         "Ngày kết thúc": formatDateToLocal(phim.NgayKetThuc),
//         "Độ tuổi": phim.DoTuoi,
//       }))
//     );

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "DanhSachPhim");

//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], {
//       type: "application/octet-stream",
//     });

//     saveAs(blob, `DanhSachPhim_${new Date().toISOString().split("T")[0]}.xlsx`);
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-4 pr-0 w-full">
//       <Card className="flex-1">
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold text-orange-500 flex items-center justify-between mb-4">
//             <span>DANH SÁCH PHIM</span>
//             <div className="flex gap-2">
//               <Button onClick={() => exportToExcel(filteredList)}>XUẤT EXCEL</Button>
//               <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//                 <DialogTrigger asChild>
//                   <Button className="bg-blue-600 text-white">THÊM PHIM</Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-4xl">
//                   <DialogTitle>{form.MaPhim ? "Sửa Phim" : "Thêm Phim"}</DialogTitle>
//                   <div className="grid gap-4">
//                     <h3 className="font-semibold">Thông tin phim</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       {[
//                         "TenPhim",
//                         "TheLoai",
//                         "DaoDien",
//                         "ThoiLuong",
//                         "NgayKhoiChieu",
//                         "NgayKetThuc",
//                         "DoTuoi",
//                         "img",
//                       ].map((field) => (
//                         <div key={field}>
//                           <Label>
//                             {field === "img"
//                               ? "Hình ảnh"
//                               : field === "NgayKetThuc"
//                               ? "Ngày kết thúc"
//                               : field === "NgayKhoiChieu"
//                               ? "Ngày khởi chiếu"
//                               : field}
//                           </Label>
//                           <Input
//                             type={
//                               field === "NgayKhoiChieu" || field === "NgayKetThuc"
//                                 ? "date"
//                                 : field === "ThoiLuong" || field === "DoTuoi"
//                                 ? "number"
//                                 : "text"
//                             }
//                             disabled={field === "NgayKetThuc"}
//                             value={form[field] ?? ""}
//                             onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//                           />
//                         </div>
//                       ))}
//                     </div>

//                     <h3 className="font-semibold mt-4">Suất chiếu</h3>
//                     <ScrollArea className="h-[200px] pr-2">
//                       {suatChieuList.map((suatChieu, index) => (
//                         <div key={index} className="grid grid-cols-6 gap-2 mb-2 items-end">
//                           <div>
//                             <Label>Mã phòng</Label>
//                             <Select
//                               value={suatChieu.MaPhong}
//                               onValueChange={(value) => handleSuatChieuChange(index, "MaPhong", value)}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Chọn phòng" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {phongList.map((phong) => (
//                                   <SelectItem key={phong.MaPhong} value={phong.MaPhong.toString()}>
//                                     {phong.MaPhong} - {phong.TenPhong}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div>
//                             <Label>Ngày chiếu</Label>
//                             <Input
//                               type="date"
//                               value={suatChieu.NgayChieu}
//                               onChange={(e) => handleSuatChieuChange(index, "NgayChieu", e.target.value)}
//                             />
//                           </div>
//                           <div>
//                             <Label>Giờ chiếu</Label>
//                             <Input
//                               type="time"
//                               value={suatChieu.GioChieu}
//                               onChange={(e) => handleSuatChieuChange(index, "GioChieu", e.target.value)}
//                             />
//                           </div>
//                           <div>
//                             <Label>Giá người lớn</Label>
//                             <Input
//                               type="number"
//                               value={suatChieu.GiaNguoiLon}
//                               onChange={(e) => handleSuatChieuChange(index, "GiaNguoiLon", e.target.value)}
//                             />
//                           </div>
//                           <div>
//                             <Label>Giá trẻ em</Label>
//                             <Input
//                               type="number"
//                               value={suatChieu.GiaTreEm}
//                               onChange={(e) => handleSuatChieuChange(index, "GiaTreEm", e.target.value)}
//                             />
//                           </div>
//                           <Dialog open={confirmDeleteSuatChieuOpen} onOpenChange={setConfirmDeleteSuatChieuOpen}>
//                             <DialogTrigger asChild>
//                               <Button
//                                 variant="destructive"
//                                 onClick={() => handleRemoveSuatChieu(index)}
//                                 disabled={suatChieuList.length === 1}
//                               >
//                                 Xóa
//                               </Button>
//                             </DialogTrigger>
//                             <DialogContent className="max-w-md">
//                               <DialogTitle>Xác nhận xóa suất chiếu</DialogTitle>
//                               <div className="py-4">
//                                 <p>Bạn có chắc muốn xóa suất chiếu này không?</p>
//                               </div>
//                               <div className="flex justify-end gap-2">
//                                 <Button variant="outline" onClick={cancelRemoveSuatChieu}>
//                                   Hủy
//                                 </Button>
//                                 <Button variant="destructive" onClick={confirmRemoveSuatChieu}>
//                                   Xác nhận
//                                 </Button>
//                               </div>
//                             </DialogContent>
//                           </Dialog>
//                         </div>
//                       ))}
//                     </ScrollArea>
//                     <Button className="w-fit" onClick={handleAddSuatChieu}>
//                       Thêm suất chiếu
//                     </Button>

//                     <Button className="mt-2" onClick={handleSave}>
//                       {form.MaPhim ? "Cập nhật" : "Thêm mới"}
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </h2>

//           <div className="grid grid-cols-10 gap-2 text-sm font-semibold border-b pb-2">
//             <div>Mã</div>
//             <div>Tên phim</div>
//             <div>Thể loại</div>
//             <div>Đạo diễn</div>
//             <div>Thời lượng</div>
//             <div>Khởi chiếu</div>
//             <div>Kết thúc</div>
//             <div>Độ tuổi</div>
//             <div className="col-span-2 text-center">Thao tác</div>
//           </div>

//           <ScrollArea className="h-[400px] pr-2 mt-2">
//             {filteredList.length === 0 ? (
//               <div className="text-center text-sm mt-4 text-gray-500">Không có dữ liệu</div>
//             ) : (
//               filteredList.map((phim) => (
//                 <div key={phim.MaPhim} className="grid grid-cols-10 gap-2 text-sm py-1 border-b items-center">
//                   <div>{phim.MaPhim}</div>
//                   <div>{phim.TenPhim}</div>
//                   <div>{phim.TheLoai}</div>
//                   <div>{phim.DaoDien}</div>
//                   <div>{phim.ThoiLuong} phút</div>
//                   <div>{formatDateToLocal(phim.NgayKhoiChieu)}</div>
//                   <div>{formatDateToLocal(phim.NgayKetThuc)}</div>
//                   <div>{phim.DoTuoi}+</div>
//                   <div className="col-span-2 text-center">
//                     <Popover>
//                       <PopoverTrigger>...</PopoverTrigger>
//                       <PopoverContent className="w-fit p-0 flex flex-col">
//                         <Button
//                           variant="outline"
//                           className="border-none shadow-none p-6"
//                           onClick={() => handleEdit(phim)}
//                         >
//                           Sửa
//                         </Button>
//                         <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
//                           <DialogTrigger asChild>
//                             <Button
//                               variant="outline"
//                               className="border-none shadow-none p-6"
//                               onClick={() => handleDelete(phim.MaPhim)}
//                             >
//                               Xóa
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="max-w-md">
//                             <DialogTitle>Xác nhận xóa phim</DialogTitle>
//                             <div className="py-4">
//                               <p>Bạn có chắc muốn xóa phim này không?</p>
//                             </div>
//                             <div className="flex justify-end gap-2">
//                               <Button variant="outline" onClick={cancelDeletePhim}>
//                                 Hủy
//                               </Button>
//                               <Button variant="destructive" onClick={confirmDeletePhim}>
//                                 Xác nhận
//                               </Button>
//                             </div>
//                           </DialogContent>
//                         </Dialog>
//                       </PopoverContent>
//                     </Popover>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </CardContent>
//       </Card>

//       <div className="w-full md:w-[300px] flex flex-col gap-6">
//         <Card>
//           <CardContent className="p-4">
//             <h2 className="font-semibold mb-4">TÌM KIẾM</h2>
//             <div className="space-y-4">
//               <div>
//                 <Label>Tên phim</Label>
//                 <Input placeholder="Tên phim" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
//               </div>
//               <div>
//                 <Label>Thể loại</Label>
//                 <Input
//                   placeholder="Thể loại"
//                   value={searchTheLoai}
//                   onChange={(e) => setSearchTheLoai(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label>Đạo diễn</Label>
//                 <Input
//                   placeholder="Đạo diễn"
//                   value={searchDaoDien}
//                   onChange={(e) => setSearchDaoDien(e.target.value)}
//                 />
//               </div>
//               <div className="flex gap-2">
//                 <Button className="w-full" onClick={handleFilter}>
//                   TÌM
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="w-full"
//                   onClick={() => {
//                     setSearchName("");
//                     setSearchTheLoai("");
//                     setSearchDaoDien("");
//                     setFilteredList(phimList);
//                   }}
//                 >
//                   XÓA LỌC
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { phimAPI } from "@/api-request/phim-api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { phongAPI } from "@/api-request/phong-api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "./image-upload";

const defaultPhim = {
  MaPhim: null,
  TenPhim: "",
  TheLoai: "",
  DaoDien: "",
  ThoiLuong: "",
  NgayKhoiChieu: "",
  NgayKetThuc: "",
  DoTuoi: "",
  img: "",
};

const defaultSuatChieu = {
  MaSC: null,
  MaPhong: "",
  NgayChieu: "",
  GioChieu: "",
  GiaNguoiLon: "",
  GiaTreEm: "",
};

// Utility to format date to YYYY-MM-DD
const formatDateToLocal = (utcDateString) => {
  if (!utcDateString) return "";
  const date = new Date(utcDateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-CA");
};

// Utility to normalize local date to UTC YYYY-MM-DD
const normalizeToUTC = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split("T")[0];
};

export default function DanhSachPhim() {
  const [phimList, setPhimList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchTheLoai, setSearchTheLoai] = useState("");
  const [searchDaoDien, setSearchDaoDien] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(defaultPhim);
  const [suatChieuList, setSuatChieuList] = useState([defaultSuatChieu]);
  const [phongList, setPhongList] = useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDeleteSuatChieuOpen, setConfirmDeleteSuatChieuOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const router = useRouter();

  useEffect(() => {
    fetchPhimList();
  }, []);

  const fetchPhimList = async () => {
    try {
      const data = await phimAPI.getAllPhim();
      const phong = await phongAPI.getAllPhong();
      setPhimList(data);
      setFilteredList(data);
      setPhongList(phong);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách phim hoặc phòng:", err);
      toast.error("Không thể tải danh sách phim hoặc phòng");
    }
  };

  const handleFilter = () => {
    const filtered = phimList.filter((phim) => {
      const matchesName = searchName.trim() === "" || phim.TenPhim.toLowerCase().includes(searchName.toLowerCase());
      const matchesTheLoai =
        searchTheLoai.trim() === "" || phim.TheLoai.toLowerCase().includes(searchTheLoai.toLowerCase());
      const matchesDaoDien =
        searchDaoDien.trim() === "" || phim.DaoDien.toLowerCase().includes(searchDaoDien.toLowerCase());
      return matchesName && matchesTheLoai && matchesDaoDien;
    });
    setFilteredList(filtered);
  };

  const handleAddSuatChieu = () => {
    setSuatChieuList([...suatChieuList, defaultSuatChieu]);
  };

  const handleSuatChieuChange = (index, field, value) => {
    const updatedList = suatChieuList.map((sc, i) =>
      i === index
        ? {
            ...sc,
            [field]: field === "NgayChieu" ? normalizeToUTC(value) : value,
          }
        : sc
    );
    setSuatChieuList(updatedList);
  };

  const handleRemoveSuatChieu = (index) => {
    setDeleteIndex(index);
    setConfirmDeleteSuatChieuOpen(true);
  };

  const confirmRemoveSuatChieu = () => {
    if (deleteIndex !== null) {
      setSuatChieuList(suatChieuList.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
    setConfirmDeleteSuatChieuOpen(false);
  };

  const cancelRemoveSuatChieu = () => {
    setDeleteIndex(null);
    setConfirmDeleteSuatChieuOpen(false);
  };

  const handleEdit = async (phim) => {
    try {
      const filmData = await phimAPI.getById(phim.MaPhim);
      setForm({
        MaPhim: filmData.phim.MaPhim,
        TenPhim: filmData.phim.TenPhim || "",
        TheLoai: filmData.phim.TheLoai || "",
        DaoDien: filmData.phim.DaoDien || "",
        ThoiLuong: filmData.phim.ThoiLuong?.toString() || "",
        NgayKhoiChieu: formatDateToLocal(filmData.phim.NgayKhoiChieu) || "",
        NgayKetThuc: formatDateToLocal(filmData.phim.NgayKetThuc) || "",
        DoTuoi: filmData.phim.DoTuoi?.toString() || "",
        img: filmData.phim.img || "",
      });
      setSuatChieuList(
        filmData.suatChieu.length > 0
          ? filmData.suatChieu.map((sc) => ({
              MaSC: sc.MaSC,
              MaPhong: sc.MaPhong.toString(),
              NgayChieu: formatDateToLocal(sc.NgayChieu),
              GioChieu: sc.GioChieu.slice(0, 5),
              GiaNguoiLon: sc.GiaNguoiLon.toString(),
              GiaTreEm: sc.GiaTreEm.toString(),
            }))
          : [defaultSuatChieu]
      );
      setDialogOpen(true);
    } catch (err) {
      toast.error("Lỗi khi tải thông tin phim để sửa");
    }
  };

  const handleSave = async () => {
    setIsLoading(true); // Set loading state
    try {
      if (!form.TenPhim || !form.NgayKhoiChieu || !form.NgayKetThuc) {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc của phim (Tên phim, Ngày khởi chiếu, Ngày kết thúc)");
        return;
      }

      for (const sc of suatChieuList) {
        if (!sc.MaPhong || !sc.NgayChieu || !sc.GioChieu || !sc.GiaNguoiLon || !sc.GiaTreEm) {
          toast.error("Vui lòng điền đầy đủ thông tin suất chiếu");
          return;
        }
      }

      const normalizedForm = {
        ...form,
        NgayKhoiChieu: normalizeToUTC(form.NgayKhoiChieu),
        NgayKetThuc: normalizeToUTC(form.NgayKetThuc),
      };
      const normalizedSuatChieuList = suatChieuList.map((sc) => ({
        ...sc,
        NgayChieu: normalizeToUTC(sc.NgayChieu),
      }));

      if (form.MaPhim) {
        await phimAPI.updatePhim({ phimData: normalizedForm, SuatChieu: normalizedSuatChieuList });
        toast.success("Cập nhật phim thành công");
      } else {
        await phimAPI.createPhim({ phimData: normalizedForm, SuatChieu: normalizedSuatChieuList });
        toast.success("Thêm phim và suất chiếu thành công");
      }

      setForm(defaultPhim);
      setSuatChieuList([defaultSuatChieu]);
      setDialogOpen(false);
      fetchPhimList();
    } catch (err) {
      toast.error(`Lỗi khi lưu phim hoặc suất chiếu: ${err.message}`);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDeletePhim = async () => {
    if (deleteId !== null) {
      try {
        await phimAPI.deletePhim(deleteId);
        toast.success("Đã ẩn phim");
        fetchPhimList();
      } catch (err) {
        toast.error("Xóa thất bại");
      }
    }
    setDeleteId(null);
    setConfirmDeleteOpen(false);
  };

  const cancelDeletePhim = () => {
    setDeleteId(null);
    setConfirmDeleteOpen(false);
  };

  const exportToExcel = (list) => {
    const ws = XLSX.utils.json_to_sheet(
      list.map((phim) => ({
        "Mã phim": phim.MaPhim,
        "Tên phim": phim.TenPhim,
        "Thể loại": phim.TheLoai,
        "Đạo diễn": phim.DaoDien,
        "Thời lượng": phim.ThoiLuong,
        "Ngày khởi chiếu": formatDateToLocal(phim.NgayKhoiChieu),
        "Ngày kết thúc": formatDateToLocal(phim.NgayKetThuc),
        "Độ tuổi": phim.DoTuoi,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSachPhim");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, `DanhSachPhim_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 pr-0 w-full">
      <Card className="flex-1">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-orange-500 flex items-center justify-between mb-4">
            <span>DANH SÁCH PHIM</span>
            <div className="flex gap-2">
              <Button onClick={() => exportToExcel(filteredList)}>XUẤT EXCEL</Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white">THÊM PHIM</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogTitle>{form.MaPhim ? "Sửa Phim" : "Thêm Phim"}</DialogTitle>
                  <div className="grid gap-4">
                    <h3 className="font-semibold">Thông tin phim</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {["TenPhim", "TheLoai", "DaoDien", "ThoiLuong", "NgayKhoiChieu", "NgayKetThuc", "DoTuoi"].map(
                        (field) => (
                          <div key={field}>
                            <Label>
                              {field === "NgayKetThuc"
                                ? "Ngày kết thúc"
                                : field === "NgayKhoiChieu"
                                ? "Ngày khởi chiếu"
                                : field}
                            </Label>
                            <Input
                              type={
                                field === "NgayKhoiChieu" || field === "NgayKetThuc"
                                  ? "date"
                                  : field === "ThoiLuong" || field === "DoTuoi"
                                  ? "number"
                                  : "text"
                              }
                              disabled={field === "NgayKetThuc"}
                              value={form[field] ?? ""}
                              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            />
                          </div>
                        )
                      )}
                      <div>
                        <Label>Hình ảnh</Label>
                        <ImageUpload
                          isLoading={isLoading}
                          value={form.img ? [form.img] : []}
                          onChange={(url) => setForm({ ...form, img: url })}
                          onRemove={() => setForm({ ...form, img: "" })}
                        />
                      </div>
                    </div>

                    <h3 className="font-semibold mt-4">Suất chiếu</h3>
                    <ScrollArea className="h-[200px] pr-2">
                      {suatChieuList.map((suatChieu, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2 mb-2 items-end">
                          <div>
                            <Label>Mã phòng</Label>
                            <Select
                              value={suatChieu.MaPhong}
                              onValueChange={(value) => handleSuatChieuChange(index, "MaPhong", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phòng" />
                              </SelectTrigger>
                              <SelectContent>
                                {phongList.map((phong) => (
                                  <SelectItem key={phong.MaPhong} value={phong.MaPhong.toString()}>
                                    {phong.MaPhong} - {phong.TenPhong}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Ngày chiếu</Label>
                            <Input
                              type="date"
                              value={suatChieu.NgayChieu}
                              onChange={(e) => handleSuatChieuChange(index, "NgayChieu", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Giờ chiếu</Label>
                            <Input
                              type="time"
                              value={suatChieu.GioChieu}
                              onChange={(e) => handleSuatChieuChange(index, "GioChieu", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Giá người lớn</Label>
                            <Input
                              type="number"
                              value={suatChieu.GiaNguoiLon}
                              onChange={(e) => handleSuatChieuChange(index, "GiaNguoiLon", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Giá trẻ em</Label>
                            <Input
                              type="number"
                              value={suatChieu.GiaTreEm}
                              onChange={(e) => handleSuatChieuChange(index, "GiaTreEm", e.target.value)}
                            />
                          </div>
                          <Dialog open={confirmDeleteSuatChieuOpen} onOpenChange={setConfirmDeleteSuatChieuOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="destructive"
                                onClick={() => handleRemoveSuatChieu(index)}
                                disabled={suatChieuList.length === 1}
                              >
                                Xóa
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogTitle>Xác nhận xóa suất chiếu</DialogTitle>
                              <div className="py-4">
                                <p>Bạn có chắc muốn xóa suất chiếu này không?</p>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={cancelRemoveSuatChieu}>
                                  Hủy
                                </Button>
                                <Button variant="destructive" onClick={confirmRemoveSuatChieu}>
                                  Xác nhận
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ))}
                    </ScrollArea>
                    <Button className="w-fit" onClick={handleAddSuatChieu}>
                      Thêm suất chiếu
                    </Button>

                    <Button className="mt-2" onClick={handleSave} disabled={isLoading}>
                      {form.MaPhim ? "Cập nhật" : "Thêm mới"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </h2>

          <div className="grid grid-cols-10 gap-2 text-sm font-semibold border-b pb-2">
            <div>Mã</div>
            <div>Tên phim</div>
            <div>Thể loại</div>
            <div>Đạo diễn</div>
            <div>Thời lượng</div>
            <div>Khởi chiếu</div>
            <div>Kết thúc</div>
            <div>Độ tuổi</div>
            <div className="col-span-2 text-center">Thao tác</div>
          </div>

          <ScrollArea className="h-[400px] pr-2 mt-2">
            {filteredList.length === 0 ? (
              <div className="text-center text-sm mt-4 text-gray-500">Không có dữ liệu</div>
            ) : (
              filteredList.map((phim) => (
                <div key={phim.MaPhim} className="grid grid-cols-10 gap-2 text-sm py-1 border-b items-center">
                  <div>{phim.MaPhim}</div>
                  <div>{phim.TenPhim}</div>
                  <div>{phim.TheLoai}</div>
                  <div>{phim.DaoDien}</div>
                  <div>{phim.ThoiLuong} phút</div>
                  <div>{formatDateToLocal(phim.NgayKhoiChieu)}</div>
                  <div>{formatDateToLocal(phim.NgayKetThuc)}</div>
                  <div>{phim.DoTuoi}+</div>
                  <div className="col-span-2 text-center">
                    <Popover>
                      <PopoverTrigger>...</PopoverTrigger>
                      <PopoverContent className="w-fit p-0 flex flex-col">
                        <Button
                          variant="outline"
                          className="border-none shadow-none p-6"
                          onClick={() => handleEdit(phim)}
                        >
                          Sửa
                        </Button>
                        <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="border-none shadow-none p-6"
                              onClick={() => handleDelete(phim.MaPhim)}
                            >
                              Xóa
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogTitle>Xác nhận xóa phim</DialogTitle>
                            <div className="py-4">
                              <p>Bạn có chắc muốn xóa phim này không?</p>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={cancelDeletePhim}>
                                Hủy
                              </Button>
                              <Button variant="destructive" onClick={confirmDeletePhim}>
                                Xác nhận
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </PopoverContent>
                    </Popover>
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
                <Label>Tên phim</Label>
                <Input placeholder="Tên phim" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
              </div>
              <div>
                <Label>Thể loại</Label>
                <Input
                  placeholder="Thể loại"
                  value={searchTheLoai}
                  onChange={(e) => setSearchTheLoai(e.target.value)}
                />
              </div>
              <div>
                <Label>Đạo diễn</Label>
                <Input
                  placeholder="Đạo diễn"
                  value={searchDaoDien}
                  onChange={(e) => setSearchDaoDien(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button className="w-full" onClick={handleFilter}>
                  TÌM
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setSearchName("");
                    setSearchTheLoai("");
                    setSearchDaoDien("");
                    setFilteredList(phimList);
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
