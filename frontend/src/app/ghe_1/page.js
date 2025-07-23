"use client";
import { useEffect, useState } from "react";

const sampleData = [
  {
    MaGhePhong: "P1A1",
    MaGhe: "A1",
    MaPhong: 1,
    SoHang: 1,
    SoGhe: 1,
    LoaiGhe: "Thường",
    TrangThai: 1,
  },
  {
    MaGhePhong: "P1A2",
    MaGhe: "A2",
    MaPhong: 1,
    SoHang: 1,
    SoGhe: 2,
    LoaiGhe: "VIP",
    TrangThai: 1,
  },
];

const basephongOptions = [
  { value: 1, label: "Phòng 1" },
  { value: 2, label: "Phòng 2" },
  { value: 3, label: "Phòng VIP" },
  { value: 4, label: "Phòng 4" },
];

export default function GheManager() {
  const [maPhong, setMaPhong] = useState(1);
  const [gheList, setGheList] = useState(sampleData);
  const [filteredGheList, setFilteredGheList] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGhe, setSelectedGhe] = useState(null);
  const [phongOptions, setPhongOptions] = useState(basephongOptions);

  const [newGhe, setNewGhe] = useState({
    maPhong: "",
    maGhe: "",
    soHang: "",
    soGhe: "",
    loaiGhe: "",
    trangThai: 1,
  });

  // Tách hàm riêng cho onClick
  const handleSelectGhe = (ghe) => {
    setSelectedGhe(ghe);
  };

  const handleChangeNewGhe = (e) => {
    setNewGhe({ ...newGhe, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredGheList(gheList);
    } else {
      const filtered = gheList.filter(
        (ghe) =>
          ghe.MaGhe.toLowerCase().includes(term.toLowerCase()) ||
          ghe.MaGhePhong.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGheList(filtered);
    }
  };

  // Stub function
  const fetchMaPhongOptions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/phong", {
        method: "GET",
      });
      const data = await response.json();
      let myPhongOptions = data.map((item) => ({
        value: item.MaPhong,
        label: item.TenPhong,
      }));

      setPhongOptions(myPhongOptions);
      setMaPhong(myPhongOptions[0].value);
    } catch (error) {
      console.error("Error fetching ma phong options:", error);
    }
  };
  const fetchGhe = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ghe/${maPhong}`, {
        method: "GET",
      });
      const data = await response.json();
      setGheList(data);
      setFilteredGheList(data);
    } catch (error) {
      console.error("Error fetching ghe:", error);
    }
  };
  const addGhe = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ghe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGhe),
      });

      if (response.ok) {
        alert("Thêm ghế thành công!");
        fetchGhe();
      } else {
        const errorData = await response.json();
        alert(`Thêm ghế thất bại: ${errorData.message}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Add chair error:", error);
    }
  };
  const updateGhe = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ghe/${selectedGhe.MaGhePhong}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          maPhong: selectedGhe.MaPhong,
          maGhe: selectedGhe.MaGhe,
          soHang: selectedGhe.SoHang,
          soGhe: selectedGhe.SoGhe,
          loaiGhe: selectedGhe.LoaiGhe,
          trangThai: selectedGhe.TrangThai,
        }),
      });

      if (response.ok) {
        alert("Cập nhật ghế thành công!");
        fetchGhe();
        setSelectedGhe(null);
      } else {
        const errorData = await response.json();
        alert(`Cập nhật ghế thất bại: ${errorData.message}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Update chair error:", error);
    }
  };
  const deleteGhe = async () => {
    if (!selectedGhe) {
      alert("Vui lòng chọn ghế để xóa!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/ghe/${selectedGhe.MaGhePhong}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Xóa ghế thành công!");
        fetchGhe();
        setSelectedGhe(null);
      } else {
        const errorData = await response.json();
        alert(`Xóa ghế thất bại: ${errorData.message}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Delete chair error:", error);
    }
  };

  useEffect(() => {
    fetchMaPhongOptions();
  }, []);

  useEffect(() => {
    fetchGhe();
  }, [maPhong]);

  return (
    <div className="h-full rounded-lg bg-gray-50 p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Quản lý ghế</h1>
      <div className="grid grid-cols-5 gap-4">
        {/* Cột 1 - 60% */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Mã phòng:</span>
            <select
              value={maPhong}
              onChange={(e) => setMaPhong(Number(e.target.value))}
              className="border p-1 rounded text-black "
            >
              {phongOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Tìm mã ghế..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border p-2 rounded"
          />

          <table className="w-full text-left border mt-2">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="p-2">Mã ghế phòng</th>
                <th className="p-2">Mã ghế</th>
                <th className="p-2">Mã phòng</th>
                <th className="p-2">Hàng</th>
                <th className="p-2">Số ghế</th>
                <th className="p-2">Loại</th>
              </tr>
            </thead>
            <tbody>
              {filteredGheList.map((ghe) => (
                <tr
                  key={ghe.MaGhePhong}
                  className={`cursor-pointer ${
                    selectedGhe?.MaGhePhong === ghe.MaGhePhong ? "bg-blue-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectGhe(ghe)}
                >
                  <td className="p-2">{ghe.MaGhePhong}</td>
                  <td className="p-2">{ghe.MaGhe}</td>
                  <td className="p-2">{ghe.MaPhong}</td>
                  <td className="p-2">{ghe.SoHang}</td>
                  <td className="p-2">{ghe.SoGhe}</td>
                  <td className="p-2">{ghe.LoaiGhe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-semibold mb-3 text-green-700 border-b border-green-200 pb-2">Bảng thêm ghế mới</div>
            <div className="space-y-2">
              <input
                type="text"
                name="maPhong"
                placeholder="Nhập mã phòng"
                value={newGhe.maPhong}
                onChange={handleChangeNewGhe}
                className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="maGhe"
                placeholder="Nhập mã ghế (bỏ trống nếu tự động)"
                value={newGhe.maGhe}
                onChange={handleChangeNewGhe}
                className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="soHang"
                placeholder="Nhập số hàng"
                value={newGhe.soHang}
                onChange={handleChangeNewGhe}
                className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="soGhe"
                placeholder="Nhập số ghế"
                value={newGhe.soGhe}
                onChange={handleChangeNewGhe}
                className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                name="loaiGhe"
                placeholder="Nhập loại ghế"
                value={newGhe.loaiGhe}
                onChange={handleChangeNewGhe}
                className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-green-500"
              />
              <button
                onClick={addGhe}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-200"
              >
                Thêm ghế
              </button>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-semibold mb-3 text-blue-700 border-b border-blue-200 pb-2">Bảng sửa / xóa ghế</div>
            {selectedGhe ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="MaPhong"
                  placeholder="Mã phòng"
                  value={selectedGhe.MaPhong}
                  onChange={(e) =>
                    setSelectedGhe({
                      ...selectedGhe,
                      MaPhong: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="MaGhe"
                  placeholder="Mã ghế"
                  value={selectedGhe.MaGhe}
                  onChange={(e) =>
                    setSelectedGhe({
                      ...selectedGhe,
                      MaGhe: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="SoHang"
                  placeholder="Số hàng"
                  value={selectedGhe.SoHang}
                  onChange={(e) =>
                    setSelectedGhe({
                      ...selectedGhe,
                      SoHang: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="SoGhe"
                  placeholder="Số ghế"
                  value={selectedGhe.SoGhe}
                  onChange={(e) =>
                    setSelectedGhe({
                      ...selectedGhe,
                      SoGhe: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="LoaiGhe"
                  placeholder="Loại ghế"
                  value={selectedGhe.LoaiGhe}
                  onChange={(e) =>
                    setSelectedGhe({
                      ...selectedGhe,
                      LoaiGhe: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-blue-500"
                />

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={updateGhe}
                    className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={deleteGhe}
                    className="w-1/2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors duration-200"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm italic text-gray-600 bg-gray-50 p-3 rounded border-l-4 border-gray-400">
                Chọn ghế trong danh sách để chỉnh sửa
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
