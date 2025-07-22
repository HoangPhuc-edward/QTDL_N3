"use client";
import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";

export default function DateSlider({ selectedDate, setSelectedDate }) {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 5;

  const visibleDates = Array.from({ length: visibleCount }, (_, i) => {
    const date = addDays(new Date(), startIndex + i);
    const dayOffset = startIndex + i;

    const label = dayOffset === 0 ? "Hôm nay" : dayOffset === 1 ? "Ngày mai" : format(date, "EEEE", { locale: vi });

    return {
      label,
      dateStr: format(date, "dd/MM"),
      date,
    };
  });

  const handleClick = (date) => {
    setSelectedDate(date);

    const today = new Date();
    const clickedIndex = Math.floor((date - today) / (1000 * 60 * 60 * 24));
    const newStart = Math.max(0, clickedIndex - 2);
    setStartIndex(newStart);
  };

  return (
    <div className="flex gap-2 overflow-x-auto">
      {visibleDates.map((item) => {
        const isActive = isSameDay(item.date, selectedDate);
        return (
          <div
            key={item.dateStr}
            onClick={() => handleClick(item.date)}
            className={`text-sm min-w-[110px] select-none text-center px-4 py-2 rounded-sm cursor-pointer
              hover:bg-white/20 transition ${
                isActive ? "bg-white/30 text-white font-semibold" : "bg-white/10 text-gray-300"
              }`}
          >
            <div className="capitalize">{item.label}</div>
            <div className="text-xs">{item.dateStr}</div>
          </div>
        );
      })}
    </div>
  );
}
