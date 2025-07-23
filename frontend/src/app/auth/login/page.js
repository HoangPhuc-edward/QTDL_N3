"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function Login() {
  const [sdt, setSdt] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!sdt.trim() || !matKhau.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/nhanvien/dangnhap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdt: sdt.trim(),
          matKhau: matKhau.trim(),
        }),
      });

      if (response.ok) {
        alert("Đăng nhập thành công!");
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        alert(`Đăng nhập thất bại: ${errorData.message || "Vui lòng kiểm tra lại thông tin"}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">Nhập thông tin để truy cập hệ thống</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = "auth/register")}
            disabled={isLoading}
          >
            Chuyển sang đăng ký
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
