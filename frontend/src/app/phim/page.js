"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockData = [
  { id: "SUP01", name: "tô", group: "GD", quantity: 63, price: 50 },
  { id: "SUP02", name: "chén", group: "GD", quantity: 42, price: 60000 },
  { id: "SUP03", name: "ly", group: "GD", quantity: 548, price: 50 },
  { id: "SUP04", name: "sữa tắm", group: "GD", quantity: 10, price: 90000 },
  { id: "SUP05", name: "bàn chải đánh răng", group: "GD", quantity: 89, price: 20000 },
  { id: "SUP06", name: "lò vi sóng", group: "GD", quantity: 3, price: 2300000 },
  { id: "SUP07", name: "bếp gas", group: "GD", quantity: 6, price: 2500000 },
  { id: "SUP08", name: "Máy xay sinh tố", group: "GD", quantity: 12, price: 1200000 },
  { id: "SUP09", name: "Cà chua", group: "RC", quantity: 19, price: 2000 },
  { id: "SUP10", name: "Dưa hấu", group: "RC", quantity: 21, price: 29000 },
  { id: "SUP11", name: "Bí đỏ", group: "RC", quantity: 35, price: 5000 },
  { id: "SUP12", name: "Cà rốt", group: "RC", quantity: 30, price: 10000 },
  { id: "SUP13", name: "Cặp cài", group: "RC", quantity: 4, price: 8000 },
  { id: "SUP14", name: "Nơ", group: "RC", quantity: 6, price: 4000 },
  { id: "SUP15", name: "Bí đao", group: "RC", quantity: 21, price: 6000 },
  { id: "SUP16", name: "Cá tím", group: "RC", quantity: 18, price: 7000 },
  { id: "SUP17", name: "Hành tây", group: "RC", quantity: 42, price: 8000 },
  { id: "SUP18", name: "Đậu hũ", group: "RC", quantity: 15, price: 3000 },
  { id: "SUP19", name: "Dầu ăn", group: "RC", quantity: 13, price: 42000 },
  { id: "SUP20", name: "Nước ngọt", group: "RC", quantity: 13, price: 10000 },
  { id: "SUP21", name: "Rau muống", group: "RC", quantity: 7, price: 5000 },
  { id: "SUP22", name: "Hành lá", group: "RC", quantity: 3, price: 3000 },
  { id: "SUP23", name: "Sả", group: "RC", quantity: 8, price: 2000 },
  { id: "SUP24", name: "Hành chẻ bông", group: "RC", quantity: 12, price: 8000 },
  { id: "SUP25", name: "Salad", group: "TP", quantity: 19, price: 3000 },
  { id: "SUP26", name: "Thịt", group: "TP", quantity: 9, price: 100000 },
  { id: "SUP27", name: "Sữa chua", group: "TP", quantity: 12, price: 12000 },
  { id: "SUP28", name: "Nước ép trái cây", group: "TP", quantity: 41, price: 12000 },
];

export default function Phim() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchName, setSearchName] = useState("");

  const filtered = mockData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedGroup === "" || item.group === selectedGroup)
    );
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 pr-0 w-full">
      <Card className="flex-1">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-orange-500 mb-4">DANH SÁCH PHIM</h2>
          <div className="grid grid-cols-6 gap-2 text-sm font-semibold border-b pb-2">
            <div>Mã SP</div>
            <div>Tên SP</div>
            <div>Nhóm</div>
            <div>SL</div>
            <div>Giá</div>
          </div>
          <ScrollArea className="h-[400px] pr-2 mt-2">
            {filtered.map((item) => (
              <div key={item.id} className="grid grid-cols-6 gap-2 text-sm py-1 border-b">
                <div>{item.id}</div>
                <div>{item.name}</div>
                <div>{item.group}</div>
                <div>{item.quantity}</div>
                <div>{item.price.toLocaleString()}</div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="w-full md:w-[300px] flex flex-col gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">THÔNG TIN SẢN PHẨM</h2>
            <div className="flex flex-col gap-2">
              <Input placeholder="Mã sản phẩm" />
              <Input placeholder="Tên sản phẩm" />
              <Select onValueChange={setSelectedGroup}>
                <SelectTrigger>Mã nhóm hàng</SelectTrigger>
                <SelectContent>
                  <SelectItem value="GD">GD</SelectItem>
                  <SelectItem value="RC">RC</SelectItem>
                  <SelectItem value="TP">TP</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Giá bán" type="number" />
              <Input placeholder="Số lượng" type="number" />
              <div className="grid grid-cols-2 gap-2">
                <Button>THÊM</Button>
                <Button variant="outline">LƯU</Button>
                <Button variant="secondary">SửA</Button>
                <Button variant="destructive">XÓA</Button>
              </div>
              <Button variant="ghost">RESET</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">TÌM KIẾM</h2>
            <Input placeholder="Tên sản phẩm" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="mt-2">Mã nhóm hàng</SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tất cả</SelectItem>
                <SelectItem value="GD">GD</SelectItem>
                <SelectItem value="RC">RC</SelectItem>
                <SelectItem value="TP">TP</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4 flex gap-2">
              <Button className="w-full">TÌM KIẾM</Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setSearchName("");
                  setSelectedGroup("");
                }}
              >
                HỦY TÌM KIẾM
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
