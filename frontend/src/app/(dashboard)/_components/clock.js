"use client";
import { useEffect, useState } from "react";

export default function DateTimeDisplay() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Lấy ngày định dạng: 25 Sep 2023
      const dateStr = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Lấy giờ định dạng: 01:48 am
      const timeStr = now
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();

      setDate(dateStr);
      setTime(timeStr);
    };

    updateDateTime();

    // Cập nhật mỗi 30s (tuỳ chọn)
    const interval = setInterval(updateDateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm">{date}</div>
      <div className="text-white text-3xl font-bold">{time}</div>
    </div>
  );
}
