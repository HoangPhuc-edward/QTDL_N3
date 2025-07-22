"use client";

import { suatchieuAPI } from "@/api-request/suat-chieu-api";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function SuatChieuTwo() {
  const [suatChieuTheoPhim, setSuatChieuTheoPhim] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null); // { sc, loai }

  const searchParams = useSearchParams();
  const router = useRouter();
  const phimId = searchParams.get("id");
  const ngay = searchParams.get("ngay");

  useEffect(() => {
    const fetchAPI = async () => {
      if (!phimId) return;
      const data = await suatchieuAPI.getSuatChieuByDate({ ngay });
      setSuatChieuTheoPhim(() => {
        return data.filter((item) => item.MaPhim == phimId);
      });
    };
    fetchAPI();
  }, [phimId]);

  const handleChonVe = (sc, loai) => {
    setSelected({ sc, loai });
    setOpenModal(true);
  };

  const handleConfirm = () => {
    if (!selected || !phimId) return;
    const gia = selected.loai === "nguoiLon" ? selected.sc.GiaNguoiLon : selected.sc.GiaTreEm;
    router.push(`/ghe?maSC=${selected.sc.MaSC}&gia=${gia}`);
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách suất chiếu</h2>

      {suatChieuTheoPhim.length === 0 ? (
        <p>Không có suất chiếu nào</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suatChieuTheoPhim.map((sc) => (
            <div
              key={sc.MaSC}
              className="relative shadow-lg overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-t-2xl p-5   hover:-top-1 top-0  transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-slate-200">Phòng: {sc.TenPhong}</h3>
                <span className="text-sm text-slate-200">{sc.GioChieu}</span>
              </div>

              <p className="text-sm text-slate-200 mb-10">
                <span>Ngày chiếu:</span> {new Date(sc.NgayChieu).toLocaleDateString()}
              </p>

              <p className="text-sm text-slate-200 mb-6">
                <span>Số ghế còn lại:</span> {sc.SoGheConLai}
              </p>

              <div className="flex gap-2 text-black">
                <Button
                  className="text-sm font-medium border bg-white  hover:bg-blue-50"
                  variant="outline"
                  onClick={() => handleChonVe(sc, "nguoiLon")}
                >
                  Người lớn ( {sc.GiaNguoiLon.toLocaleString()}đ )
                </Button>
                <Button
                  className="text-sm font-medium border bg-white  hover:bg-red-50"
                  variant="outline"
                  onClick={() => handleChonVe(sc, "treEm")}
                >
                  Trẻ em ( {sc.GiaTreEm.toLocaleString()}đ )
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đặt vé</DialogTitle>
          </DialogHeader>
          <div>
            Bạn có chắc muốn đặt vé <strong>{selected?.loai === "nguoiLon" ? "người lớn" : "trẻ em"}</strong> với giá{" "}
            <strong>
              {selected?.loai === "nguoiLon"
                ? selected?.sc?.GiaNguoiLon.toLocaleString()
                : selected?.sc?.GiaTreEm.toLocaleString()}
              đ
            </strong>{" "}
            không?
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={() => setOpenModal(false)} variant="outline">
              Huỷ
            </Button>
            <Button onClick={handleConfirm} className="bg-blue-600 text-white">
              Đồng ý
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SuatChieuTwo;
