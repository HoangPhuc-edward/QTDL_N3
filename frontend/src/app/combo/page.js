"use client";

import { useEffect, useState } from "react";

const baseComboData = [
  {
    MaCombo: 1,
    TenCombo: "Combo 1",
    GiaCombo: 50000,
    MoTa: "Bắp ngọt + nước ngọt",
  },
  {
    MaCombo: 2,
    TenCombo: "Combo 2",
    GiaCombo: 70000,
    MoTa: "Bắp phô mai + Pepsi",
  },
  {
    MaCombo: 3,
    TenCombo: "Combo VIP",
    GiaCombo: 100000,
    MoTa: "Bắp caramel + nước lớn + snack",
  },
];

export default function Combo() {
  const maVe = 1;

  const [maKH, setMaKH] = useState(1);
  const [khachHang, setKhachHang] = useState({
    tenKhachHang: "Nguyễn Văn A",
    soDienThoai: "0123456789",
  });

  // Thông tin vé (const)
  const [ve, setVe] = useState({
    phim: "Spider-Man: No Way Home",
    suatChieu: "19:30 - 21/07/2025",
    phong: "Phòng 1",
    ghe: "A5",
    giaVe: 80000,
  });

  // State cho combo được chọn
  const [selectedComboId, setSelectedComboId] = useState("");
  const [comboData, setComboData] = useState(baseComboData);
  const [soLuongCombo, setSoLuongCombo] = useState(1);

  const handleSelectCombo = (comboId) => {
    setSelectedComboId(comboId);
  };

  const handleChangeQuantity = (value) => {
    const quantity = parseInt(value) || 1;
    setSoLuongCombo(quantity);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + " VNĐ";
  };

  const taoHoaDon = async () => {
    const selectedCombo = comboData.find(
      (combo) => combo.MaCombo == selectedComboId
    );

    const hoaDonData = {
      MaKH: 1,
      MaNV: 1,
      MaCombo: selectedComboId,
      SoLuongCombo: soLuongCombo,
    };

    try {
      const response = await fetch("http://localhost:5000/api/hoa-don", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hoaDonData),
      });

      if (response.ok) {
        alert("Tạo hóa đơn thành công!");
      } else {
        alert("Có lỗi xảy ra khi tạo hóa đơn!");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Có lỗi xảy ra khi tạo hóa đơn!");
    }
  };

  const fetchComboData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bap-nuoc");
      if (!response.ok) {
        throw new Error("Failed to fetch combo data");
      }
      const data = await response.json();
      setComboData(data);
    } catch (error) {
      console.error("Error fetching combo data:", error);
      return [];
    }
  };

  const fetchVeData = async () => {
    try {
      const response = await fetch(`/api/ve/${maVe}`);
      if (!response.ok) {
        throw new Error("Failed to fetch ticket data");
      }
      const data = await response.json();
      setVe({
        phim: data.phim,
        suatChieu: data.suatChieu,
        phong: data.phong,
        ghe: data.ghe,
        giaVe: data.giaVe,
      });
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  const fetchKhachHangData = async () => {
    try {
      const response = await fetch(`/api/khach-hang/${maKH}`);
      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }
      const data = await response.json();
      setKhachHang({
        tenKhachHang: data.tenKhachHang,
        soDienThoai: data.soDienThoai,
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchComboData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        CHỌN COMBO
      </h3>

      <div
        style={{ display: "flex", gap: "20px", height: "calc(100vh - 120px)" }}
      >
        {/* Cột trái - 60% - Danh sách combo */}
        <div
          style={{
            flex: "3",
            border: "2px solid #000",
            padding: "20px",
            backgroundColor: "#fff",
            overflow: "auto",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#000",
                borderBottom: "2px solid #000",
                paddingBottom: "10px",
              }}
            >
              DANH SÁCH COMBO
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "left",
                      color: "#000",
                    }}
                  >
                    Mã
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "left",
                      color: "#000",
                    }}
                  >
                    Tên Combo
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "left",
                      color: "#000",
                    }}
                  >
                    Mô Tả
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                      color: "#000",
                    }}
                  >
                    Giá
                  </th>
                </tr>
              </thead>
              <tbody>
                {comboData.map((combo) => (
                  <tr key={combo.MaCombo} style={{ backgroundColor: "#fff" }}>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {combo.MaCombo}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {combo.TenCombo}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "10px",
                        fontSize: "14px",
                        color: "#000",
                      }}
                    >
                      {combo.MoTa}
                    </td>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "right",
                        color: "#000",
                      }}
                    >
                      {formatCurrency(combo.GiaCombo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>Nhập thông tin khách</div>
          </div>
        </div>

        {/* Cột phải - 40% - Hóa đơn */}
        <div
          style={{
            flex: "2",
            border: "2px solid #000",
            padding: "20px",
            backgroundColor: "#fff",
            overflow: "auto",
            maxHeight: "calc(100vh - 120px)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#000",
              borderBottom: "2px solid #000",
              paddingBottom: "10px",
            }}
          >
            HÓA ĐƠN
          </h2>

          {/* Thông tin khách hàng */}
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#000",
              }}
            >
              THÔNG TIN KHÁCH HÀNG
            </h3>
            <p style={{ margin: "5px 0", color: "#000" }}>
              <strong>Tên:</strong> {khachHang.tenKhachHang}
            </p>
            <p style={{ margin: "5px 0", color: "#000" }}>
              <strong>SDT:</strong> {khachHang.soDienThoai}
            </p>
          </div>

          {/* Chọn combo */}
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#000",
              }}
            >
              CHỌN COMBO
            </h3>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                Tên combo:
              </label>
              <select
                value={selectedComboId}
                onChange={(e) => handleSelectCombo(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "2px solid #000",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <option value="">-- Chọn combo --</option>
                {comboData.map((combo) => (
                  <option key={combo.MaCombo} value={combo.MaCombo}>
                    {combo.TenCombo} - {formatCurrency(combo.GiaCombo)}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                Số lượng:
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={soLuongCombo}
                onChange={(e) => handleChangeQuantity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "2px solid #000",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              />
            </div>
          </div>

          {/* Tính tiền và tạo hóa đơn */}
          <div style={{ borderTop: "2px solid #000", paddingTop: "20px" }}>
            <button
              onClick={taoHoaDon}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              TẠO HÓA ĐƠN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
