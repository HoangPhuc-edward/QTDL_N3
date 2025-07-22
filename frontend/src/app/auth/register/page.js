"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

function Register() {
  const [hoTenNV, setHoTenNV] = useState("");
  const [sdt, setSdt] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !hoTenNV.trim() ||
      !sdt.trim() ||
      !matKhau.trim() ||
      !nhapLaiMatKhau.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (matKhau !== nhapLaiMatKhau) {
      alert("Mật khẩu và nhập lại mật khẩu không khớp!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/nhanvien/dangky",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hoTenNV: hoTenNV.trim(),
            sdt: sdt.trim(),
            matKhau: matKhau.trim(),
          }),
        }
      );

      if (response.ok) {
        alert("Đăng ký thành công!");
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        alert(
          `Đăng ký thất bại: ${
            errorData.message || "Vui lòng kiểm tra lại thông tin"
          }`
        );
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Đăng ký
          </CardTitle>
          <CardDescription className="text-center">
            Tạo tài khoản mới để truy cập hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hoTenNV">Họ tên nhân viên</Label>
            <Input
              id="hoTenNV"
              type="text"
              placeholder="Nhập họ tên"
              value={hoTenNV}
              onChange={(e) => setHoTenNV(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sdt">Số điện thoại</Label>
            <Input
              id="sdt"
              type="tel"
              placeholder="Nhập số điện thoại"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="matKhau">Mật khẩu</Label>
            <Input
              id="matKhau"
              type="password"
              placeholder="Nhập mật khẩu"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nhapLaiMatKhau">Nhập lại mật khẩu</Label>
            <Input
              id="nhapLaiMatKhau"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={nhapLaiMatKhau}
              onChange={(e) => setNhapLaiMatKhau(e.target.value)}
              disabled={isLoading}
              onKeyPress={(e) => e.key === "Enter" && handleRegister()}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            className="w-full"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = "/auth/login")}
            disabled={isLoading}
          >
            Chuyển sang đăng nhập
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
