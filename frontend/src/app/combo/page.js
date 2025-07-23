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
  const [maKH, setMaKH] = useState(null); // Initialize as null since it may be assigned by the API
  const [khachHang, setKhachHang] = useState({
    tenKhachHang: "",
    soDienThoai: "",
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

  const handleKhachHangChange = (field, value) => {
    setKhachHang((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + " VNĐ";
  };

  const taoHoaDon = async () => {
    const hoaDonData = {
      MaKH: maKH || null, // Use null if maKH is not set
      TenKhachHang: khachHang.tenKhachHang,
      SoDienThoai: khachHang.soDienThoai,
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
        // Reset customer inputs after successful invoice creation
        setKhachHang({ tenKhachHang: "", soDienThoai: "" });
        setSelectedComboId("");
        setSoLuongCombo(1);
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
      setComboData(baseComboData); // Fallback to baseComboData on error
    }
  };

  useEffect(() => {
    fetchComboData();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "10px",
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
          color: "#0f172a",
        }}
      >
        CHỌN COMBO
      </h3>

      <div style={{ display: "flex", gap: "20px", height: "calc(100vh - 200px)" }}>
        {/* Cột trái - 60% - Danh sách combo */}
        <div
          style={{
            flex: "3",
            border: "2px solid #0f172a",
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
                color: "#0f172a",
                borderBottom: "2px solid #0f172a",
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
                      border: "1px solid #0f172a",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "left",
                      color: "#0f172a",
                    }}
                  >
                    Mã
                  </th>
                  <th
                    style={{
                      border: "1px solid #0f172a",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "left",
                      color: "#0f172a",
                    }}
                  >
                    Tên Combo
                  </th>
                  <th
                    style={{
                      border: "1px solid #0f172a",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "left",
                      color: "#0f172a",
                    }}
                  >
                    Mô Tả
                  </th>
                  <th
                    style={{
                      border: "1px solid #0f172a",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                      color: "#0f172a",
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
                        border: "1px solid #0f172a",
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#0f172a",
                      }}
                    >
                      {combo.MaCombo}
                    </td>
                    <td
                      style={{
                        border: "1px solid #0f172a",
                        padding: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#0f172a",
                      }}
                    >
                      {combo.TenCombo}
                    </td>
                    <td
                      style={{
                        border: "1px solid #0f172a",
                        padding: "10px",
                        fontSize: "14px",
                        color: "#0f172a",
                      }}
                    >
                      {combo.MoTa}
                    </td>
                    <td
                      style={{
                        border: "1px solid #0f172a",
                        padding: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "right",
                        color: "#0f172a",
                      }}
                    >
                      {formatCurrency(combo.GiaCombo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#0f172a",
                }}
              >
                NHẬP THÔNG TIN KHÁCH HÀNG
              </h3>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#0f172a",
                  }}
                >
                  Tên khách hàng:
                </label>
                <input
                  type="text"
                  value={khachHang.tenKhachHang}
                  onChange={(e) => handleKhachHangChange("tenKhachHang", e.target.value)}
                  placeholder="Nhập tên khách hàng"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "2px solid #0f172a",
                    fontSize: "16px",
                    backgroundColor: "#fff",
                    color: "#0f172a",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#0f172a",
                  }}
                >
                  Số điện thoại:
                </label>
                <input
                  type="tel"
                  value={khachHang.soDienThoai}
                  onChange={(e) => handleKhachHangChange("soDienThoai", e.target.value)}
                  placeholder="Nhập số điện thoại"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "2px solid #0f172a",
                    fontSize: "16px",
                    backgroundColor: "#fff",
                    color: "#0f172a",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải - 40% - Hóa đơn */}
        <div
          style={{
            flex: "2",
            border: "2px solid #0f172a",
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
              color: "#0f172a",
              borderBottom: "2px solid #0f172a",
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
                color: "#0f172a",
              }}
            >
              THÔNG TIN KHÁCH HÀNG
            </h3>
            <p style={{ margin: "5px 0", color: "#0f172a" }}>
              <strong>Tên:</strong> {khachHang.tenKhachHang || "Chưa nhập"}
            </p>
            <p style={{ margin: "5px 0", color: "#0f172a" }}>
              <strong>SDT:</strong> {khachHang.soDienThoai || "Chưa nhập"}
            </p>
          </div>

          {/* Chọn combo */}
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#0f172a",
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
                  color: "#0f172a",
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
                  border: "2px solid #0f172a",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#0f172a",
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
                  color: "#0f172a",
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
                  border: "2px solid #0f172a",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#0f172a",
                }}
              />
            </div>
          </div>

          {/* Tính tiền và tạo hóa đơn */}
          <div style={{ borderTop: "2px solid #0f172a", paddingTop: "20px" }}>
            <button
              onClick={taoHoaDon}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#0f172a",
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
