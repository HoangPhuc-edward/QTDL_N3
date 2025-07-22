"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  {
    MaGhePhong: "P1A3",
    MaGhe: "A3",
    MaPhong: 1,
    SoHang: 1,
    SoGhe: 3,
    LoaiGhe: "Thường",
    TrangThai: 0,
  },
];

export default function Ghe() {
  const maSC = 1;
  const [maPhong, setMaPhong] = useState(1);
  const [gheList, setGheList] = useState(sampleData);
  const [filteredGheList, setFilteredGheList] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGhe, setSelectedGhe] = useState(null);
  const [checkGheCode, setCheckGheCode] = useState("");
  const [checkResult, setCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleSelectGhe = async (ghe) => {
    const isAvailable = await checkGheAvailability(ghe.MaGhePhong, maSC);
    if (!isAvailable) {
      alert("Ghế này đã được đặt!");
      return;
    }
    setSelectedGhe({ ...ghe, isAvailable });
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
          ghe.LoaiGhe.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGheList(filtered);
    }
  };

  const handleCheckGhe = async () => {
    if (!checkGheCode.trim()) {
      alert("Vui lòng nhập mã ghế!");
      return;
    }

    setIsChecking(true);
    try {
      const ghe = gheList.find(
        (g) => g.MaGhe.toLowerCase() === checkGheCode.toLowerCase()
      );
      if (!ghe) {
        setCheckResult({ found: false, message: "Không tìm thấy ghế này!" });
      } else {
        const isAvailable = await checkGheAvailability(ghe.MaGhePhong, maSC);
        setCheckResult({
          found: true,
          ghe: ghe,
          isAvailable,
          message: isAvailable ? "Ghế này còn trống" : "Ghế này đã được đặt",
        });
      }
    } catch (error) {
      setCheckResult({ found: false, message: "Có lỗi xảy ra khi kiểm tra!" });
    } finally {
      setIsChecking(false);
    }
  };

  const fetchGhe = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ghe/sc/${maSC}`, {
        method: "GET",
      });
      const data = await response.json();
      setGheList(data);
      setFilteredGheList(data);
    } catch (error) {
      console.error("Error fetching ghe:", error);
    }
  };

  const checkGheAvailability = async (maGhePhong, maSC) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/ghe/check/${maGhePhong}/${maSC}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error("Error checking ghe availability:", error);
      return false;
    }
  };

  const getGheStatusColor = (ghe) => {
    if (selectedGhe?.MaGhePhong === ghe.MaGhePhong)
      return "bg-blue-500 text-white border-blue-600";
    if (ghe.LoaiGhe === "VIP")
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-green-100 text-green-800 border-green-300";
  };

  useEffect(() => {
    fetchGhe();
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-hidden">
      <div className="h-full w-full flex flex-col">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          🎬 Chọn ghế xem phim
        </h1>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0">
          {/* Cột 1 - 60% */}
          <div className="lg:col-span-3 flex flex-col space-y-4 min-h-0">
            {/* Thông tin suất chiếu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Suất chiếu</div>
                  <div className="text-2xl font-bold text-blue-600">
                    #{maSC}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Phòng chiếu</div>
                  <div className="text-2xl font-bold text-green-600">
                    Phòng {maPhong}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Thanh tìm kiếm */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-4">
                <Input
                  placeholder="Tìm kiếm ghế (mã ghế, loại ghế)..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="text-gray-800 border-gray-300"
                />
              </CardContent>
            </Card>

            {/* Danh sách ghế */}
            <Card className="bg-white shadow-md flex-1 flex flex-col min-h-0">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  🪑 Sơ đồ ghế
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-auto">
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                    {filteredGheList.map((ghe) => (
                      <div
                        key={ghe.MaGhePhong}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${getGheStatusColor(
                          ghe
                        )}`}
                        onClick={() => handleSelectGhe(ghe)}
                      >
                        <div className="text-center">
                          <div className="font-bold text-lg">{ghe.MaGhe}</div>
                          <div className="text-xs mt-1">{ghe.LoaiGhe}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chú thích */}
                <div className="border-t pt-4 flex-shrink-0">
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Chú thích:
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                      <span>Ghế thường</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                      <span>Ghế VIP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
                      <span>Đang chọn</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cột 2 - 40% */}
          <div className="lg:col-span-2 flex flex-col space-y-4 min-h-0">
            {/* Kiểm tra ghế */}
            <Card className="bg-white shadow-md w-full">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  🔍 Kiểm tra ghế
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập mã ghế (VD: A1, B2...)"
                    value={checkGheCode}
                    onChange={(e) => setCheckGheCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleCheckGhe}
                    disabled={isChecking}
                    className="px-6"
                  >
                    {isChecking ? "..." : "Kiểm tra"}
                  </Button>
                </div>

                {checkResult && (
                  <div
                    className={`p-3 rounded-lg ${
                      checkResult.found && checkResult.isAvailable
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div
                      className={`font-medium ${
                        checkResult.found && checkResult.isAvailable
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {checkResult.message}
                    </div>
                    {checkResult.found && (
                      <div className="text-sm text-gray-600 mt-2">
                        <div>Loại ghế: {checkResult.ghe.LoaiGhe}</div>
                        <div>
                          Vị trí: Hàng {checkResult.ghe.SoHang}, Ghế{" "}
                          {checkResult.ghe.SoGhe}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Thông tin ghế được chọn */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  ✅ Ghế đã chọn
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedGhe ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-blue-600">
                          {selectedGhe.MaGhe}
                        </div>
                        <div className="text-lg text-gray-600">
                          {selectedGhe.LoaiGhe}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Hàng:</span>
                          <div className="font-semibold">
                            {selectedGhe.SoHang}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Số ghế:</span>
                          <div className="font-semibold">
                            {selectedGhe.SoGhe}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            selectedGhe.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedGhe.isAvailable
                            ? "✅ Còn trống"
                            : "❌ Đã đặt"}
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      disabled={!selectedGhe.isAvailable}
                    >
                      Xác nhận chọn ghế
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-4">🪑</div>
                    <div className="text-lg font-medium">Chưa chọn ghế</div>
                    <div className="text-sm mt-2">
                      Nhấp vào ghế trong sơ đồ để chọn
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
