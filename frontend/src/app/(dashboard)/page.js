"use client";
import DateTimeDisplay from "./_components/clock";
import User from "./_components/user";
import DateSlider from "./_components/date-slider";
import CardPhim from "./_components/card";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { suatchieuAPI } from "@/api-request/suat-chieu-api";

export default function Home() {
  const [listPhimByDate, setListPhimByDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [seens, setSeens] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await suatchieuAPI.getSuatChieuByDate({ ngay: formatDate(selectedDate) });
      const seen = {};
      const a = data.filter((item) => {
        if (seen[[item.MaPhim]]) {
          seen[[item.MaPhim]] += 1;
          return false;
        } else {
          seen[[item.MaPhim]] = 1;
          return true;
        }
      });
      setSeens(seen);
      setListPhimByDate(() => {
        return a;
      });
    };
    fetchAPI();
  }, [selectedDate]);
  return (
    <main className="  pr-0">
      {/* Header */}
      <div className="flex items-center mb-6 flex-row-reverse justify-between">
        <User />

        <DateTimeDisplay />
        <DateSlider setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
          ...listPhimByDate,
        ]?.map((item, i) => (
          <CardPhim key={i} item={item} seens={seens} ngay={formatDate(selectedDate)} />
        ))}
      </div>
    </main>
  );
}
