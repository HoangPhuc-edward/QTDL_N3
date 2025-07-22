import httpRequest from "@/lib/http";
import { getCurrentTimeString } from "@/lib/utils";

export const suatchieuAPI = {
  getSuatChieuByDate({ ngay }) {
    const gio = getCurrentTimeString();
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/suatchieu/tim-suat-chieu?ngay=${ngay}&gio=${gio}`;
    return httpRequest.get(url);
  },
  getSuatChieuTheoPhim({ phimId }) {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/suatchieu/phim/${phimId}`;
    return httpRequest.get(url);
  },
};
