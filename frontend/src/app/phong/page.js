"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleData = [
  { MaPhong: 1, TenPhong: "Phòng 1", SoGhe: 60, LoaiPhong: "2D", TrangThai: 1 },
  { MaPhong: 2, TenPhong: "Phòng 2", SoGhe: 80, LoaiPhong: "3D", TrangThai: 1 },
  {
    MaPhong: 3,
    TenPhong: "Phòng VIP",
    SoGhe: 40,
    LoaiPhong: "IMAX",
    TrangThai: 1,
  },
  { MaPhong: 4, TenPhong: "Phòng 4", SoGhe: 60, LoaiPhong: "2D", TrangThai: 1 },
];

export default function Phong() {
  const [phongList, setPhongList] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ tenPhong: "", soGhe: "", LoaiPhong: "" });
  const [autoForm, setAutoForm] = useState({
    maPhong: "",
    soCotToiDa: "",
    soHangToiDa: "",
  });

  async function fetchPhong() {
    try {
      const response = await fetch("http://localhost:5000/api/phong", {
        method: "GET",
      });

      const data = await response.json();
      setPhongList(data.filter((p) => p.TrangThai === 1));
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Fetch room error:", error);
    }
  }

  async function addPhong() {
    try {
      const response = await fetch("http://localhost:5000/api/phong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Thêm phòng thành công!");
        fetchPhong();
      } else {
        const errorData = await response.json();
        alert(`Thêm phòng thất bại: ${errorData.message}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Add room error:", error);
    }
  }

  async function deletePhong() {
    try {
      const response = await fetch(`http://localhost:5000/api/phong/${selected.MaPhong}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Xóa phòng thành công!");
        fetchPhong();
      } else {
        const errorData = await response.json();
        alert(`Xóa phòng thất bại: ${errorData.message}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Del room error:", error);
    }
  }

  async function updatePhong() {
    try {
      const response = await fetch(`http://localhost:5000/api/phong/${selected.MaPhong}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenPhong: selected.TenPhong,
          soGhe: selected.SoGhe,
          loaiPhong: selected.LoaiPhong,
          trangThai: selected.TrangThai,
        }),
      });

      if (response.ok) {
        alert("Cập nhật phòng thành công!");
        fetchPhong();
      } else {
        const errorData = await response.json();
        alert(`Cập nhật phòng thất bại: ${errorData.message}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Update room error:", error);
    }
  }

  async function autoCreateChairs() {
    try {
      const response = await fetch("http://localhost:5000/api/phong/auto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          maPhong: parseInt(autoForm.maPhong),
          soCotToiDa: parseInt(autoForm.soCotToiDa),
          soHangToiDa: parseInt(autoForm.soHangToiDa),
        }),
      });

      if (response.ok) {
        alert("Tạo ghế tự động thành công!");
        setAutoForm({ maPhong: "", soCotToiDa: "", soHangToiDa: "" });
        fetchPhong();
      } else {
        const errorData = await response.json();
        alert(`Tạo ghế tự động thất bại: ${errorData.message}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Auto create chairs error:", error);
    }
  }

  useEffect(() => {
    fetchPhong();
  }, []);

  const filteredList = phongList.filter((p) => p.TenPhong?.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    addPhong();
  };

  const handleDelete = () => {
    if (!selected) return;
    deletePhong();
  };

  const handleUpdate = () => {
    if (!selected) return;
    updatePhong();
  };

  const handleAutoCreate = () => {
    if (!autoForm.maPhong || !autoForm.soCotToiDa || !autoForm.soHangToiDa) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    autoCreateChairs();
  };

  return (
    <div className="flex flex-col rounded-lg h-full md:flex-row gap-6 p-4 pr-0 w-full bg-gray-50">
      {/* Left Column */}

      <div className="w-[60%] space-y-4">
        <h2 className="text-lg font-semibold" style={{ color: "black" }}>
          Quản lý phòng
        </h2>
        <Input
          placeholder="Tìm kiếm phòng..."
          value={search}
          style={{ color: "black" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Card>
          <CardHeader>
            <CardTitle>Danh sách phòng</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Mã</th>
                  <th className="border p-2">Tên</th>
                  <th className="border p-2">Số ghế</th>
                  <th className="border p-2">Loại</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((p) => (
                  <tr key={p.MaPhong} className="cursor-pointer hover:bg-blue-100" onClick={() => setSelected(p)}>
                    <td className="border p-2">{p.MaPhong}</td>
                    <td className="border p-2">{p.TenPhong}</td>
                    <td className="border p-2">{p.SoGhe}</td>
                    <td className="border p-2">{p.LoaiPhong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="w-[40%] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thêm phòng mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input
              placeholder="Tên phòng"
              value={form.tenPhong}
              onChange={(e) => setForm({ ...form, tenPhong: e.target.value })}
            />
            <Input
              placeholder="Số ghế"
              type="number"
              value={form.soGhe}
              onChange={(e) => setForm({ ...form, soGhe: e.target.value })}
            />
            <select
              className="w-full border rounded p-2"
              value={form.LoaiPhong}
              onChange={(e) => setForm({ ...form, LoaiPhong: e.target.value })}
            >
              <option value="">Chọn loại phòng</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
            <Button className="w-full" onClick={handleAdd}>
              Thêm phòng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thêm ghế tự động</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input
              placeholder="Mã phòng"
              type="number"
              value={autoForm.maPhong}
              onChange={(e) => setAutoForm({ ...autoForm, maPhong: e.target.value })}
            />
            <Input
              placeholder="Số cột ghế tối đa"
              type="number"
              value={autoForm.soCotToiDa}
              onChange={(e) => setAutoForm({ ...autoForm, soCotToiDa: e.target.value })}
            />
            <Input
              placeholder="Số hàng ghế tối đa"
              type="number"
              value={autoForm.soHangToiDa}
              onChange={(e) => setAutoForm({ ...autoForm, soHangToiDa: e.target.value })}
            />
            <Button className="w-full" variant="outline" onClick={handleAutoCreate}>
              Tạo ghế tự động
            </Button>
          </CardContent>
        </Card>

        {selected && (
          <Card>
            <CardHeader>
              <CardTitle>Sửa / Xóa phòng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input value={selected.MaPhong} disabled />
              <Input
                value={selected.TenPhong}
                onChange={(e) => setSelected({ ...selected, TenPhong: e.target.value })}
              />
              <Input
                type="number"
                value={selected.SoGhe}
                onChange={(e) => setSelected({ ...selected, SoGhe: parseInt(e.target.value) })}
              />
              <select
                className="w-full border rounded p-2"
                value={selected.LoaiPhong}
                onChange={(e) => setSelected({ ...selected, LoaiPhong: e.target.value })}
              >
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="IMAX">IMAX</option>
              </select>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleUpdate}>
                  Cập nhật
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleDelete}>
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
